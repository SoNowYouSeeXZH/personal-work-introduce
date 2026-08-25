export type KnowledgeSection = {
  heading: string;
  paragraphs: string[];
  code?: string;
};

export type KnowledgeNote = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  sections: KnowledgeSection[];
};

export const knowledgeNotes: KnowledgeNote[] = [
  {
    slug: "langgraph-agent-engineering-notes",
    title: "LangGraph Agent 工程实践笔记",
    excerpt: "从状态管理、图调度到可恢复 Agent，整理我对 LangGraph 工程机制的理解。",
    category: "学习笔记",
    tags: ["LangGraph", "Agent", "Python", "工作流"],
    publishedAt: "2026-08-25",
    readingTime: "12 分钟",
    sections: [
      {
        heading: "LangGraph 是什么",
        paragraphs: [
          "LangGraph 是一个用于构建有状态、长流程 Agent 和工作流的编排框架。可以把它理解成“状态管理器 + 流程调度器”：State 是共享状态，Node 是处理逻辑，Edge 是执行关系，Checkpoint 保存执行过程中的状态快照。",
          "一个 Agent 的基本执行链路是：输入写入 State 对应的 Channel，触发 Node，Node 返回状态更新，Reducer 合并更新，再根据 Edge 触发下一个 Node。它比普通的 LLM Chain 多了状态、流程、工具、暂停恢复和故障处理能力。",
        ],
      },
      {
        heading: "State、Node、Edge 与 Channel",
        paragraphs: [
          "State 可以看成团队成员共同使用的白板。节点读取当前状态，完成一段工作，再返回自己负责的状态增量，而不是直接修改整个白板。",
          "Node 是一个执行函数，Edge 是工作流的转移规则。固定边表示执行完 A 后去 B，条件边则根据状态选择下一步。State 中的字段会映射成运行时 Channel，Channel 负责保存当前值、接收更新、按规则合并，并支持 Checkpoint 序列化和恢复。",
        ],
        code: "class AgentState(TypedDict):\n    messages: list\n    logs: Annotated[list[str], add]\n\ndef analyst(state: AgentState) -> dict:\n    return {\"logs\": [\"分析完成\"]}",
      },
      {
        heading: "Channel 与 Reducer",
        paragraphs: [
          "常见 Channel 包括只保留一个值的 LastValue、追加消息的 Topic，以及使用 reducer 累积更新的 BinaryOperatorAggregate。Reducer 决定多个节点同时更新同一个字段时如何合并。",
          "例如 total 字段使用 add 作为 reducer 时，多个节点分别返回 1 和 2，最终结果就是旧值加 1 再加 2。如果使用 LastValue，同一个超级步收到多个更新通常会产生冲突，因为系统无法判断哪个值应该覆盖哪个值。",
        ],
      },
      {
        heading: "编译期与路由 Channel",
        paragraphs: [
          "调用 compile() 后，声明式图会被转换成 Pregel Runtime 可以直接执行的结构：State 字段转换成 Channel，Node 转换成 PregelNode，Edge 转换成 writers 和路由 Channel。",
          "每个节点都有自己的触发 Channel，例如 branch:to:model。固定边会在起点节点完成后写入目标节点的门铃，条件边则先运行路径函数，再决定写入哪个门铃。编译期还会建立 channel 到订阅节点的 trigger_to_nodes 索引，运行时不必枚举全部节点。",
        ],
      },
      {
        heading: "Pregel 与 BSP 超级步",
        paragraphs: [
          "LangGraph 的运行可以理解为一轮一轮的超级步：plan、execute、apply。plan 根据 Channel 版本和触发关系准备本轮任务，execute 调度任务并允许同一批任务并发执行，apply 在同步屏障后统一合并所有写入。",
          "这就是 BSP（Bulk Synchronous Parallel）：一次准备一批任务，批内可以并发，整批结束后同步更新状态。它让状态边界和每个超级步结束时的 Checkpoint 都更清晰，代价是本轮最慢的任务会拖慢整个超级步。",
        ],
      },
      {
        heading: "ReAct Agent 与 ToolNode",
        paragraphs: [
          "最小的 ReAct Agent 是 model → 判断是否有 tool_calls → tools → model 的循环。模型通过 bind_tools 获得工具描述，但模型只负责决定是否调用、调用哪个工具以及传入什么参数。真正执行工具的是工具节点。",
          "实际项目通常使用 ToolNode，它负责查找工具、校验参数、执行一个或多个工具、封装 ToolMessage，并处理工具异常。工具设计还需要考虑超时、重试、权限、幂等性、敏感操作审批，以及多个工具调用能否并发。",
        ],
        code: "AIMessage(\n    content=\"\",\n    tool_calls=[{\n        \"name\": \"add_numbers\",\n        \"args\": {\"a\": 1, \"b\": 2},\n        \"id\": \"call_123\",\n    }],\n)",
      },
      {
        heading: "RetryPolicy 与错误处理",
        paragraphs: [
          "网络超时和临时限流通常值得重试，API Key 缺失、参数错误和权限错误通常不应该重试。RetryPolicy 可以配置初始间隔、退避倍数、最大间隔、最大尝试次数和允许重试的异常类型。",
          "每次重试前会清理上一次尝试的写入，避免失败尝试的半成品状态污染下一次执行。interrupt 等控制信号不应该被当成普通错误重试。",
        ],
      },
      {
        heading: "Checkpoint 与时间旅行",
        paragraphs: [
          "Checkpoint 是 Agent 的存档，至少包含各 Channel 的数据快照、版本号，以及节点最后见过的 Channel 版本。thread_id 是 Checkpoint 的主键，因此会话隔离依赖稳定且唯一的 thread_id。",
          "InMemorySaver 适合 demo，SQLite 适合单机开发，Postgres 适合多实例生产部署。图对象可以重新创建，只要状态还在 Checkpoint 中就能恢复。时间旅行还可以查看历史状态、从旧状态 fork 新分支，或修改历史状态后重新执行。",
        ],
        code: "config = {\"configurable\": {\"thread_id\": \"user-001\"}}\ngraph.invoke(input_data, config)",
      },
      {
        heading: "Interrupt 与 Command",
        paragraphs: [
          "普通异常表示任务失败，interrupt 表示任务主动暂停，等待人类决策。它适合转账、发邮件、删除数据、修改生产配置等高风险操作，恢复时通过稳定的 thread_id 和 Command 继续执行。",
          "Command 允许节点同时更新状态并决定下一步。条件边更适合在图定义阶段声明路由，Command 更适合节点根据运行时结果动态跳转。",
        ],
      },
      {
        heading: "Subgraph 与 Send",
        paragraphs: [
          "复杂 Agent 不应该全部塞进一张大图，可以拆成 Research、Analysis、Review、Report 等专业子图。父图负责总流程，子图负责一个领域，关键是定义清楚输入、输出和状态边界。",
          "Send 允许运行时动态创建任务，适合批量文档分析、多网页检索、多文件代码审查和多子问题分解。使用时需要提前设计 reducer、任务数量上限、失败任务处理、结果顺序和部分成功策略。",
        ],
      },
      {
        heading: "Stream 与生产链路",
        paragraphs: [
          "invoke() 像等所有工作完成后一次返回，stream() 则可以持续输出过程。values 代表每一步完整状态，updates 代表状态增量，messages 代表模型 token，custom 可以承载业务进度事件。实际服务通常通过 SSE 或 WebSocket 把这些事件传给前端。",
          "一个具有工程价值的 Agent，通常需要覆盖 ReAct 与 ToolNode、Checkpoint 与会话隔离、持久化、流式输出、人工审批、错误恢复、批量处理和分层编排。",
        ],
      },
      {
        heading: "最终理解",
        paragraphs: [
          "LangGraph 不是让模型自己聊天的库，而是给模型接上状态、工具、流程、审批、持久化和恢复能力的运行时。模型负责局部决策，图负责全局可控执行。",
          "Channel 承载状态，Reducer 合并更新；Edge 和 Command 控制路线；Checkpoint 记住进度；Stream 提供实时反馈；Interrupt 把关键决策交给人。它们共同把一次性的 Agent 脚本变成可以长期运行、可观察、可恢复、可审计的工程系统。",
        ],
      },
    ],
  },
];

export function getKnowledgeNote(slug: string) {
  return knowledgeNotes.find((note) => note.slug === slug);
}
