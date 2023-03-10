import clsx from 'clsx';
import { useTheme } from 'next-themes';
import useMounted from 'hooks/use-mounted';
import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';

function App() {
  const { mounted } = useMounted();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [currentDir, setCurrentDir] = useState('');
  const handleDir = async () => {
    try {
      const dir = await invoke<string>('current_dir');
      setCurrentDir(dir);
    } catch (e) {
      console.log(e);
      setCurrentDir('');
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div className="text-5xl">Hello world!</div>
      {mounted && (
        <>
          <div>Current theme: {currentTheme}</div>
        </>
      )}
      <button className={clsx('rounded p-4')}>
        {currentTheme === 'dark' ? (
          <>
            <span onClick={() => setTheme('light')}>Light</span>
          </>
        ) : (
          <>
            <span onClick={() => setTheme('dark')}>Dark</span>
          </>
        )}
      </button>

      <div>
        <button className={clsx('rounded p-4')} onClick={handleDir}>
          Show current dir
        </button>
        <p>{currentDir}</p>
      </div>
    </>
  );
}

export default App;
