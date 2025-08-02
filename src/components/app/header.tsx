import { ProModal } from './pro-modal';

export function Header() {
  return (
    <header className="w-full p-4 flex justify-between items-center fixed top-0 left-0 z-50 bg-background/20 backdrop-blur-lg">
      <h1 className="text-2xl md:text-3xl font-headline text-white tracking-wider">
        Nebula <span className="text-primary">AppForge</span>
      </h1>
      <ProModal />
    </header>
  );
}
