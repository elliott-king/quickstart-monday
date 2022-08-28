import React, { useState } from "react";

// @ts-ignore (no declared types)
import { AttentionBox, Box, Flex, Search } from "monday-ui-react-core";

const numberContents = [
  {
    number: 1,
    recyclable: "Recyclable",
    name: "PET, PETE (Polyethylene, Terephthalate)",
    content: "Single use clear-hard plastic",
    example: "soft drink bottles, fruit juice container, oil container",
  },
  {
    number: 2,
    recyclable: "Recyclable",
    name: "HDPE (High-density Polyethylene)",
    content: "Hard plastic not as transparent as PET",
    example: "milk jugs, shampoo bottles, yogurt containers",
  },
  {
    number: 3,
    recyclable: "Recyclable at Specialist Points Only",
    name: "PVC (Polyvinyl Chloride)",
    content: "Plastic not as stiff as PET and HDPE",
    example: "pipes, cables, furniture",
  },
  {
    number: 4,
    recyclable: "Reusable and Safe to Repurpose",
    name: "LDPE (Low-density Polyethylene)",
    content: "Soft, flexible plastic",
    example: "frozen food bags, bread bags, grocery bags",
  },
  {
    number: 5,
    name: "PP (Polypropylene)",
    content: "Plastic commonly found in straws",
    example: "kitchenware, bottle tops, microwaveable takeout containers",
    recyclable: "Safe to Repurpose, Recyclable",
  },
  {
    number: 6,
    name: "PS (Polystyrene)",
    content: "Plastic commonly found in coffee cups",
    example: "thermometers, license plate frames, egg shell cartoons",
    recyclable: "Recyclable at Specialist Points Only",
  },
  {
    number: 7,
    name: "Other Plastics",
    content: "Mixed plastic materials",
    example: "water cooler bottles, large plastic containers, nylon",
    recyclable: "Not Really Recyclable",
  },
];

/** Adapt the "Search" component - doesn't normally support white text */
const SearchInput = ({
  searchInput,
  onChange,
  onSubmit,
}: {
  searchInput: string;
  onChange: (s: string) => void;
  onSubmit: () => void;
}) => (
  <div className="input-component search_component_wrapper" role="search">
    <div className="input-component__label--wrapper">
      <div className="input-component__input-wrapper input-component__input-wrapper--size-medium">
        <input
          className="search_component input-component__input input-component__input--has-icon"
          style={{ color: "white", borderColor: "white" }}
          placeholder=""
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") onSubmit();
          }}
        />
        <div
          className="monday-style-clickable input-component__icon--container input-component__icon--container-has-icon input-component__icon--container-active monday-style-clickable--disable-text-selection"
          data-testid="clickable"
          role="button"
          tabIndex={-1}
          onClick={() => onSubmit()}
        >
          <svg
            viewBox="0 0 20 20"
            fill="white"
            width="18px"
            height="18px"
            aria-hidden="true"
            aria-label="Search"
            className="icon_component input-component__icon icon_component--no-focus-style"
          >
            <path
              d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div
          className="monday-style-clickable input-component__icon--container input-component__icon--container-has-icon monday-style-clickable--disable-text-selection"
          data-testid="clean-search-button_search"
          role="button"
          tabIndex={-1}
        >
          <svg
            viewBox="0 0 20 20"
            fill="white"
            width="18px"
            height="18px"
            aria-hidden="true"
            aria-label="Clear Search"
            className="icon_component input-component__icon icon_component--no-focus-style"
          >
            <path
              d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L8.62562 9.68628L5.47045 12.8415C5.17756 13.1343 5.17756 13.6092 5.47045 13.9021C5.76334 14.195 6.23822 14.195 6.53111 13.9021L9.68628 10.7469L12.8415 13.9021C13.1343 14.195 13.6092 14.195 13.9021 13.9021C14.195 13.6092 14.195 13.1343 13.9021 12.8415L10.7469 9.68628L13.9029 6.53033C14.1958 6.23744 14.1958 5.76256 13.9029 5.46967C13.61 5.17678 13.1351 5.17678 12.8422 5.46967L9.68628 8.62562L6.53033 5.46967Z"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const RecyclingNumber = ({
  idx,
  onClick,
}: {
  idx: number;
  onClick: () => void;
}) => {
  const content = numberContents[idx];

  return (
    <div
      style={{
        backgroundColor: "rgba(202, 217, 173, 0.8)",
        borderRadius: "5px",
        fontWeight: 600,
        padding: "16px",
        height: "125px",
        width: "408px",
        color: "black",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Flex gap={Flex.gaps.LARGE}>
        <img
          src={`recycle-${content.number}.png`}
          alt={`Recycle triangle with number ${content.number}`}
        />
        <Flex
          direction={Flex.directions.COLUMN}
          gap={Flex.gaps.MEDIUM}
          align={Flex.align.START}
        >
          <Flex
            direction={Flex.directions.COLUMN}
            align={Flex.align.START}
            style={{ textAlign: "left" }}
          >
            <span>{content.name}</span>
            <span>{content.content}</span>
            <span>ex. {content.example}</span>
          </Flex>
          <span>{content.recyclable}</span>
        </Flex>
      </Flex>
    </div>
  );
};

export const RecycleChecker = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recyclingNumber, setRecyclingNumber] = useState(0);

  const handleRecyclingBoxClick = () => {
    setRecyclingNumber((prev) => {
      if (prev === numberContents.length - 1) return 0;
      return prev + 1;
    });
  };

  const handleSearchSubmit = () => {
    console.log(searchInput);
    setSearchInput("");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/forest-bg.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        borderRadius: "6px",
        padding: "13px",
      }}
    >
      <div
        style={{
          background: "rgb(217, 217, 217, 0.2)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          padding: "13px",
          color: "white",
        }}
      >
        <Flex gap={Flex.gaps.LARGE}>
          <div style={{ flexShrink: 0 }}>
            <h4>Can I Recycle This?</h4>
            <SearchInput
              searchInput={searchInput}
              onChange={(s: string) => setSearchInput(s)}
              onSubmit={handleSearchSubmit}
            />
          </div>
          <Flex
            style={{ textAlign: "center" }}
            gap={Flex.gaps.MEDIUM}
            direction={Flex.directions.COLUMN}
          >
            <h4>Recycling Numbers + What They Mean</h4>
            <RecyclingNumber
              idx={recyclingNumber}
              onClick={handleRecyclingBoxClick}
            />
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
