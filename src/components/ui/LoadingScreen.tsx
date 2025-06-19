import Logo from "./Logo";

const LoadingScreen = () => {
  return (
    <div className="fixed-0 bg-background inset-0 flex h-screen w-full flex-col items-center justify-center">
      <div className="animate-pulse">
        <Logo className="w-30 md:w-25" />
      </div>
    </div>
  );
};

export default LoadingScreen;
