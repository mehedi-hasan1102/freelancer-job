export const DASHBOARD =
  'relative min-h-screen overflow-hidden bg-[var(--bg)] py-[clamp(4rem,8vw,8rem)]';
export const DASHBOARD_CONTAINER =
  'relative z-[2] mx-auto max-w-[1400px] px-[clamp(1rem,4vw,4rem)] max-[768px]:px-8 max-[640px]:px-6';
export const HEADER = 'mb-10 flex flex-col gap-3 overflow-hidden text-left';
export const TITLE_ACCENT = 'text-[var(--accent)]';
export const MAIN_GRID =
  'mb-12 grid grid-cols-2 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-4';
export const CARD =
  'group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(6,182,212,0.25)] bg-transparent p-8 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:border-[rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] max-[640px]:p-6';
export const CARD_GLOW =
  'pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100';
export const PROFILE_CARD =
  'col-[1/2] row-[1/2] max-[768px]:col-[1/-1] max-[768px]:row-auto';
export const STATS_CARD =
  'col-[2/3] row-[1/2] max-[768px]:col-[1/-1] max-[768px]:row-auto';
export const SECTION_HEADER =
  'relative z-[1] mb-6 flex flex-wrap items-center justify-between gap-4 max-[768px]:flex-col max-[768px]:items-start';
export const SECTION_TITLE =
  'm-0 flex items-center gap-2 text-[clamp(1rem,2vw,1.25rem)] font-semibold tracking-[-0.01em] text-[var(--text)] max-[640px]:text-[0.95rem]';
export const VIEW_LINK =
  'flex items-center gap-1 text-[0.8rem] font-medium text-[var(--accent)] no-underline transition-all duration-200 [transition-timing-function:ease] hover:gap-2';
export const PROJECTS_GRID =
  'grid grid-cols-3 gap-6 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1';
export const PROJECT_CARD =
  'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(6,182,212,0.25)] bg-transparent p-7 [perspective:1000px] [transform-style:preserve-3d] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] will-change-transform hover:border-[rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] max-[640px]:p-6';
export const PROJECT_GLOW =
  'pointer-events-none absolute left-0 top-0 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.4),transparent_50%)] opacity-0 blur-[20px] [mix-blend-mode:screen] transition-opacity duration-300 [transition-timing-function:ease] will-change-transform group-hover:opacity-100';
export const PROJECT_LINK_ICON =
  'absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-[10px] border border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)] opacity-0 translate-y-[-6px] scale-[0.95] transition-all duration-300 [transition-timing-function:ease] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100';
