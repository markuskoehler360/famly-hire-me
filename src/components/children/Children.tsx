import { useEffect, useState } from "react";
import ChildCard from "../child-card/ChildCard";
import { useChildrenData } from "../../hooks/useChildrenData";
import { Child } from "../../models/models";

const SCROLL_OFFSET = 50;
const ITEMS_PER_PAGE = 10;

function Children() {
  const [numberOfShownItems, setNumberOfShownItems] =
    useState<number>(ITEMS_PER_PAGE);
  const [isAllDataShown, setIsAllDataShown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = loadMoreItems;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numberOfShownItems]);

  const { isLoading, error, data } = useChildrenData();
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const loadMoreItems = () => {
    if (
      window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - SCROLL_OFFSET &&
      !isAllDataShown
    ) {
      setNumberOfShownItems(numberOfShownItems + ITEMS_PER_PAGE);
    }

    if (data && data.children.length <= numberOfShownItems) {
      setIsAllDataShown(true);
    }
  };

  return (
    <div>
      <h1>Children</h1>
      {data.children
        ?.slice(0, numberOfShownItems)
        .map((item: Child, index: number) => (
          <ChildCard
            key={index}
            name={item.name.fullName}
            isCheckedIn={item.checkedIn}
            checkinTime={item.checkinTime}
            id={item.childId}
          />
        ))}
      {isAllDataShown ? <p>This is the end of the list.</p> : null}
    </div>
  );
}

export default Children;
