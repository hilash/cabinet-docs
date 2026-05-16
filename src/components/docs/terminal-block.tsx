import { CopyButton } from "./copy-button";

export function TerminalBlock({
  command,
  label,
  multiline,
}: {
  command: string;
  label?: string;
  multiline?: boolean;
}) {
  return (
    <div className="terminal-chrome my-4 not-prose">
      <div className="term-dots">
        <span className="term-dot r" />
        <span className="term-dot y" />
        <span className="term-dot g" />
        <span className="ml-2 font-mono">{label ?? "cabinet ~ zsh"}</span>
      </div>
      <div className="term-body flex items-start justify-between gap-3">
        <pre className="m-0 flex-1 overflow-x-auto whitespace-pre-wrap font-mono text-[13px] text-white/85">
          <span className="text-emerald-400">$ </span>
          {multiline ? command : <span className="whitespace-nowrap">{command}</span>}
        </pre>
        <CopyButton text={command} />
      </div>
    </div>
  );
}
