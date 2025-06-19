import pfp from "@/assets/images/Avatar.png";
import Image from "next/image";
import { Button } from "../ui/Button";

const SuggestionsComp = () => {
  return (
    <div className="border-card rounded-xl border-2 p-5">
      <h2 className="text-surface text-lg font-semibold">Suggestions</h2>
      <ul className="mt-6 flex flex-col gap-4">
        <SuggestionItem />
        <SuggestionItem />
        <SuggestionItem />
      </ul>
    </div>
  );
};

export default SuggestionsComp;

const SuggestionItem = () => {
  return (
    <li className="flex items-center gap-2">
      <Image alt={"pfp"} src={pfp} className="h-[37px] w-auto object-cover" />
      <div className="flex flex-col">
        <div className="flex items-center justify-start gap-1">
          <span className="text-surface line-clamp-1 font-bold">
            World Health
          </span>
          <i className="fi fi-sr-check-circle text-link"></i>
        </div>
        <span className="text-secondary text-sm">11.1k posts • Health</span>
      </div>
      <Button className="ml-auto text-[12px] font-semibold">Join</Button>
    </li>
  );
};
