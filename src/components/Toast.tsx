import { useFlyer } from '@/store/flyerStore';

export default function Toast() {
  const { state } = useFlyer();

  if (!state.toast?.visible) return null;

  return (
    <div
      className="fixed bottom-20 left-4 z-[300] bg-black text-white text-xs px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-300"
    >
      {state.toast.message}
    </div>
  );
}
