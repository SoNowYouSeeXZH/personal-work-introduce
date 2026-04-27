import { ScrollProgress, ScrollReveal, TextReveal } from "./components/ScrollAnimations";

const highlights = [
  { value: "5 年", label: "前端开发经验" },
  { value: "0→1", label: "大型 Web 应用主导经验" },
  { value: "React", label: "主力技术栈" },
  { value: "Security", label: "安全业务场景沉淀" },
];

const skillGroups = [
  {
    title: "Frontend Core",
    desc: "扎实的 HTML / CSS / JavaScript 基础，擅长复杂交互、数据处理与组件化抽象。",
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Hooks"],
  },
  {
    title: "Framework Ecosystem",
    desc: "以 React 为主，同时熟悉 Vue 2/3 及常见企业级组件生态。",
    skills: ["React Router", "MobX", "Ant Design", "Vue", "Vue Router", "Element Plus"],
  },
  {
    title: "Engineering",
    desc: "理解 Webpack / Vite 工程化差异，可定制构建流程并做打包优化。",
    skills: ["Webpack", "Vite", "Tailwind", "Code Splitting", "Lazy Loading", "Git"],
  },
  {
    title: "Performance & Browser",
    desc: "关注浏览器渲染主线程、事件循环、V8 与核心 Web 性能指标。",
    skills: ["FCP", "LCP", "Rendering", "Event Loop", "V8", "Resource Optimization"],
  },
];

const experiences = [
  {
    period: "2022.01 — 至今",
    company: "百度在线网络技术有限公司",
    role: "高级前端工程师",
    summary:
      "负责成都 / 基础安全部 / 安全运营组前端技术方案设计与实施，协调前端小组人力及部分工作内容。",
    points: [
      "主导或参与暴露威胁管理平台、SOAR 剧本编排平台、凭证托管、安全左移平台、安全小考等系统开发与维护。",
      "负责安全官网 anquan.baidu.com、BCTF 全球赛事、HVV 攻防演习、百度安全月等重要页面开发。",
      "与深圳、北京研发团队协同，保障安全业务项目合规、高效交付。",
    ],
  },
  {
    period: "2021.03 — 2022.01",
    company: "网易游戏（互娱）",
    role: "前端实习生",
    summary:
      "负责网易游戏官网、手机游戏官网与活动宣传页开发，参与交互设计讨论与移动端适配。",
    points: [
      "完成官网与活动页的响应式布局、移动端兼容与视觉还原。",
      "参与页面交互设计讨论，提出用户体验与动效优化建议。",
    ],
  },
];

const projects = [
  {
    name: "SOAR 剧本编排系统",
    time: "2023.05 — 至今",
    stack: "React · TypeScript · MobX · React Flow · WebSocket",
    intro:
      "用于安全自动化响应的数据流编排系统，支持通过可视化流程编辑器构建、配置并实时执行安全事件处理剧本。",
    bullets: [
      "基于 React Flow 构建节点拖拽、连线配置与流程编排能力。",
      "通过 JSON Schema 动态生成节点配置表单，支持自定义节点参数与可执行代码。",
      "使用 WebSocket 实现执行日志实时展示，并设计 success / running / fail 多状态可视化。",
    ],
  },
  {
    name: "暴露威胁管理平台",
    time: "2025.11 — 至今",
    stack: "React · TypeScript · MobX · Hooks · acud",
    intro:
      "面向企业安全资产风险监测与管理的后台系统，支持资产管理、威胁分析、任务执行与策略配置。",
    bullets: [
      "根据 PRD 与 UI 设计图选型技术框架、组件库并搭建项目工程。",
      "实现流式配置卡片组件，提升复杂策略配置的灵活性。",
      "封装通用 Hooks 与业务组件，优化大批量表单数据处理与系统可维护性。",
    ],
  },
  {
    name: "凭证管理助手（IDE 插件页面）",
    time: "2025.03 — 至今",
    stack: "React · TypeScript · Hooks · Ant Design",
    intro:
      "集成在开发者 IDE 中的凭证申请与管理工具，通过三步式表单引导用户完成凭证申请流程。",
    bullets: [
      "实现 IDE 插件内嵌页面与三步式向导表单交互。",
      "设计跨步骤数据联动机制，根据上一步输入动态生成后续步骤结构。",
      "统一管理多步骤表单状态、动态渲染与校验逻辑，提升可用性。",
    ],
  },
];

const principles = [
  "复杂业务前端架构",
  "可视化流程编排",
  "实时数据交互",
  "组件化与 Hooks 抽象",
  "性能优化与工程化",
  "审美驱动的用户体验",
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#05070b] text-slate-100">
      <ScrollProgress />

      <section id="hero" className="relative flex min-h-[88vh] items-center px-6 pt-24 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute right-[-10%] top-1/3 h-[420px] w-[420px] rounded-full bg-amber-500/15 blur-[110px]" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-cyan-200 shadow-2xl shadow-cyan-950/30 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
                Available for Frontend Interview
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h1 className="mt-8 max-w-5xl text-6xl font-black tracking-[-0.08em] text-white md:text-8xl lg:text-[8.5rem] lg:leading-[0.86]">
                徐子涵
                <span className="block bg-gradient-to-r from-cyan-200 via-white to-amber-200 bg-clip-text text-transparent">
                  Frontend Engineer
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                5 年开发经验，现任百度高级前端工程师。擅长 React / TypeScript、复杂业务系统、可视化流程编排、实时数据交互与组件化架构设计。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#experience"
                  className="group rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  查看项目经历
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="mailto:xzhjobweb@163.com"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10"
                >
                  联系我
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.18} direction="left">
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-cyan-300/30 via-transparent to-amber-300/30 opacity-60" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080b12] p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-slate-400">
                  <span>resume.profile.tsx</span>
                  <span className="text-emerald-300">● live</span>
                </div>
                <div className="mt-6 space-y-5 font-mono text-sm leading-7">
                  <p><span className="text-cyan-300">const</span> engineer = &#123;</p>
                  <p className="pl-5"><span className="text-slate-500">name:</span> <span className="text-amber-200">&quot;徐子涵&quot;</span>,</p>
                  <p className="pl-5"><span className="text-slate-500">role:</span> <span className="text-amber-200">&quot;Senior Frontend Engineer&quot;</span>,</p>
                  <p className="pl-5"><span className="text-slate-500">stack:</span> [ [<span className="text-amber-200">&quot;React&quot;</span>, <span className="text-amber-200">&quot;TypeScript&quot;</span>, <span className="text-amber-200">&quot;MobX&quot;</span>],</p>
                  <p className="pl-5"><span className="text-slate-500">focus:</span> <span className="text-amber-200">&quot;UX × Engineering × Performance&quot;</span>,</p>
                  <p>&#125;</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-8 mt-4 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.label} delay={index * 0.06}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]">
                <p className="text-3xl font-black tracking-tight text-white lg:text-4xl">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <TextReveal
            text="我希望面试官看到的不只是简历文本，而是一个前端工程师对信息结构、视觉审美、动画节奏和工程实现的综合表达。"
            className="text-3xl font-bold leading-snug tracking-[-0.04em] text-white md:text-5xl lg:text-6xl"
          />
        </div>
      </section>

      <section id="skills" className="relative px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Skill Matrix</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">技术栈不是列表，是交付能力。</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                从框架生态、工程化、浏览器原理到性能指标，构成可落地的前端技术判断力。
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <ScrollReveal key={group.title} delay={index * 0.08}>
                <article className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.07]">
                  <div className="absolute right-6 top-6 font-mono text-6xl font-black text-white/[0.03] transition-all duration-500 group-hover:text-cyan-300/10">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white">{group.title}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">{group.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors group-hover:border-cyan-300/30 group-hover:text-cyan-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-300">Experience</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
              在真实大型业务中打磨工程能力。
            </h2>
          </ScrollReveal>

          <div className="mt-9 space-y-5">
            {experiences.map((item, index) => (
              <ScrollReveal key={item.company} delay={index * 0.08}>
                <article className="grid gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-7 backdrop-blur md:grid-cols-[260px_1fr] lg:p-9">
                  <div>
                    <p className="font-mono text-sm text-cyan-300">{item.period}</p>
                    <h3 className="mt-4 text-2xl font-black text-white">{item.company}</h3>
                    <p className="mt-2 text-sm font-semibold text-amber-200">{item.role}</p>
                  </div>
                  <div>
                    <p className="text-lg leading-8 text-slate-200">{item.summary}</p>
                    <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">Selected Projects</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">能讲清楚复杂系统，也能做出来。</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {principles.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.name} delay={index * 0.08}>
                <article className="group flex min-h-[520px] flex-col rounded-[2rem] border border-white/10 bg-[#090d15] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/40 hover:shadow-2xl hover:shadow-amber-950/20">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">{project.time}</span>
                    <span className="font-mono text-4xl font-black text-white/[0.05] group-hover:text-amber-200/20">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black tracking-tight text-white">{project.name}</h3>
                  <p className="mt-3 font-mono text-xs leading-6 text-amber-200">{project.stack}</p>
                  <p className="mt-6 text-sm leading-7 text-slate-400">{project.intro}</p>
                  <ul className="mt-8 space-y-4 text-sm leading-7 text-slate-300">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="border-l border-cyan-300/30 pl-4">{bullet}</li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20 lg:px-8 lg:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-white/[0.06] to-amber-400/15 p-8 shadow-2xl shadow-black/30 backdrop-blur lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">Contact</p>
                <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
                  如果你需要一个懂工程、也懂体验的前端工程师。
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                  我具备复杂业务系统开发经验，熟悉可视化流程编排、实时数据交互及组件化架构设计，并愿意持续用更好的交互与审美提升产品价值。
                </p>
              </div>
              <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-black/25 p-6">
                <a className="block rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition-all hover:-translate-y-1 hover:bg-cyan-200" href="mailto:xzhjobweb@163.com">
                  xzhjobweb@163.com
                </a>
                <a className="block rounded-2xl border border-white/10 px-5 py-4 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:border-amber-200/50 hover:bg-white/[0.06]" href="tel:18808208479">
                  18808208479
                </a>
                <p className="px-1 text-xs leading-6 text-slate-500">
                  电子科技大学 · 信息管理与信息系统 · 成都
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
