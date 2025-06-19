"use client";

import LoadingScreen from "../ui/LoadingScreen";
import { useLoadingState } from "@/stores/loadingStore";

const LoadingPage = () => {
  const isLoading = useLoadingState((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0">
          <LoadingScreen />
        </div>
      )}
    </>
  );
};

export default LoadingPage;
