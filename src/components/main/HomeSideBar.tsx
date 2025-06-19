import SuggestionsComp from "./SuggestionsComp";

const HomeSideBar = () => {
  return (
    <>
      <div className="flex flex-col gap-7">
        <SuggestionsComp />
        <SuggestionsComp />
      </div>
    </>
  );
};

export default HomeSideBar;
