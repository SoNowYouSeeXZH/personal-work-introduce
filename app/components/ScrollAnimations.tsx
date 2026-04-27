"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

/**
 * 统一 spring 配置：让 scrollYProgress 输出更丝滑，不再是线性硬切换。
 * 低 stiffness + 适中 damping + 小 mass = 柔和跟手。
 */
const SPRING_CONFIG = { stiffness: 120, damping: 30, mass: 0.25, restDelta: 0.001 };

/**
 * GPU 加速 hint：强制开启合成层，减少重绘。
 */
const gpu = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden" as const,
  transform: "translateZ(0)",
};

/**
 * ScrollReveal - 元素进入视口时触发一次性动画
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
  };

  return (
    <motion.div
      className={className}
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * TextReveal - 大文字随滚动逐渐显现
 */
export function TextReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.25"],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <p className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={smooth} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] mt-1">
      <motion.span style={{ opacity, willChange: "opacity" }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/**
 * ParallaxImage - 图片视差滚动
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.2,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const y = useTransform(smooth, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y, ...gpu }}
        className="h-[115%] w-full object-cover"
      />
    </div>
  );
}

/**
 * ScaleOnScroll - Hero 区域文字随滚动缩放+淡出
 *
 * 关键：Hero 容器 h=120vh，内部 sticky 子元素 h=100vh，
 *      所以真正"图片还在屏幕上"的滚动区间 = 20vh，对应 progress [0, 0.167]。
 *      动画必须在这段内完成，否则会出现"文字没了但图片还在 sticky / 图片已离屏但没到下一屏"的空白感。
 *
 * stickyRatio 参数表示 sticky 子高度占容器高度的比例，默认 100/120 ≈ 0.833，
 * 剩余 0.167 = Hero 真正可滚区间。
 */
export function ScaleOnScroll({
  children,
  className = "",
  stickyRatio = 100 / 120,
}: {
  children: React.ReactNode;
  className?: string;
  stickyRatio?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scrollable = 1 - stickyRatio; // ≈ 0.167
  // 动画在 sticky 有效滚动区间内完成，完成即离屏，零空白。
  const scale = useTransform(scrollYProgress, [0, scrollable], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, scrollable * 0.85], [1, 0]);

  return (
    <motion.div ref={ref} style={{ scale, opacity, ...gpu }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * StickySection - 粘性区域，内部内容随滚动切换
 */
export function StickySection({
  items,
}: {
  items: { title: string; description: string; image: string; accent: string }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);

  const totalItems = items.length;

  // 每张卡片滚动距离 80vh（原 100vh），切换更紧凑
  return (
    <div
      ref={containerRef}
      style={{ height: `${totalItems * 80}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {items.map((item, i) => (
          <StickyCard
            key={i}
            item={item}
            index={i}
            totalItems={totalItems}
            progress={smooth}
          />
        ))}
      </div>
    </div>
  );
}

function StickyCard({
  item,
  index,
  totalItems,
  progress,
}: {
  item: { title: string; description: string; image: string; accent: string };
  index: number;
  totalItems: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / totalItems;
  const t = seg * 0.18;
  const start = index * seg;
  const end = start + seg;

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  const opacity = useTransform(
    progress,
    isFirst
      ? [end - t, end]
      : isLast
        ? [start, start + t]
        : [start, start + t, end - t, end],
    isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0]
  );

  // 轻微 y 位移配合淡入淡出，让切换更有呼吸感
  const y = useTransform(
    progress,
    isFirst
      ? [end - t, end]
      : isLast
        ? [start, start + t]
        : [start, start + t, end - t, end],
    isFirst ? [0, -20] : isLast ? [20, 0] : [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, y, ...gpu }}
      className="absolute inset-0 flex items-center"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 items-center">
        <div>
          <span
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: item.accent }}
          >
            0{index + 1}
          </span>
          <h3 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 dark:text-stone-50 lg:text-5xl">
            {item.title}
          </h3>
          <p className="mt-6 text-base leading-relaxed text-stone-500 dark:text-stone-400 lg:text-lg">
            {item.description}
          </p>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * HorizontalScroll - 横向滚动画廊
 */
export function HorizontalScroll({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, SPRING_CONFIG);
  const x = useTransform(smooth, [0, 1], ["0%", "-28%"]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x, ...gpu }} className="flex gap-5">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Counter - 数字进入视口时上浮淡入
 */
export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {value}
      {suffix}
    </motion.span>
  );
}

/**
 * ScrollProgress - 页面顶部滚动进度条
 * 进度条必须严格跟手，不加 spring
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[2px] origin-left bg-amber-500"
      style={{ scaleX: scrollYProgress, willChange: "transform" }}
    />
  );
}
