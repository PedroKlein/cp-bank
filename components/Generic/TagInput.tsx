import { LegacyRef, useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

type Props = {
  suggestions: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
};

const TagInput: React.FC<Props> = ({ suggestions, selectedTags, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);

  const filteredTags = suggestions
    .filter((tag) => tag.toLowerCase().startsWith(inputValue.toLowerCase()))
    .filter((tag) => !selectedTags.includes(tag));

  function onBlur() {
    //timeout to fix onblur no triggering onClick of list
    setTimeout(() => setFocused(false), 200);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && inputValue.length > 0) {
      event.preventDefault();

      addTag(filteredTags[0]);
    } else if (event.key === "Backspace" && inputValue === "") {
      removeTag(selectedTags.length - 1);
    }
  }

  function handleTagClick(tag: string) {
    removeTag(selectedTags.indexOf(tag));
  }

  function addTag(tag: string) {
    if (
      tag !== "" &&
      !selectedTags.includes(tag) &&
      suggestions.includes(tag)
    ) {
      onChange([...selectedTags, tag]);
      setInputValue("");
    }
  }

  function removeTag(index: number) {
    const newTags = [...selectedTags];
    newTags.splice(index, 1);
    onChange(newTags);
  }

  return (
    <div className="flex flex-wrap gap-2 text-default">
      {selectedTags.map((tag) => (
        <div
          key={tag}
          className="flex items-center px-2 py-1 rounded-md bg-primary hover:bg-neutral cursor-pointer"
          onClick={() => handleTagClick(tag)}
        >
          <span>{tag}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
      <div className="relative">
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          placeholder="Add tag"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        {suggestions.length > 0 && focused && (
          <ul className="absolute z-10 w-full top-full left-0 py-1 mt-2 bg-default rounded-md shadow-md max-h-[20vh] overflow-auto">
            {filteredTags.map((tag) => (
              <li
                key={tag}
                className="px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() => addTag(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="flex items-center px-2 py-1 rounded-md bg-primary"
        onClick={() => addTag(inputValue.trim())}
      >
        <BsPlusCircle className="w-5 h-5 mr-2" />
        Add
      </button>
    </div>
  );
};

export default TagInput;
