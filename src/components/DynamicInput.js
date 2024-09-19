import React, { useRef } from "react";

const tagList = [
  "React",
  "Next.js",
  "Tailwind",
  "JavaScript",
  "CSS",
  "HTML",
  "Node.js",
];

const TagInput = () => {
  const divRef = useRef(null);

  const handleTagClick = (tag) => {
    const selection = window.getSelection();
    let range = null;

    if (!selection || selection.rangeCount === 0) {
      range = document.createRange();
      range.selectNodeContents(divRef.current);
      range.collapse(false);
    } else {
      range = selection.getRangeAt(0);

      if (!divRef.current.contains(range.commonAncestorContainer)) {
        return;
      }

      let currentNode = range.commonAncestorContainer;
      while (currentNode && currentNode !== divRef.current) {
        if (currentNode.classList && currentNode.classList.contains("tag")) {
          return;
        }
        currentNode = currentNode.parentNode;
      }
    }

    range.deleteContents();

    const span = document.createElement("span");
    span.classList.add("tag");
    span.textContent = tag;
    span.contentEditable = false;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.onclick = () => span.remove();

    span.appendChild(deleteButton);
    range.insertNode(span);

    const space = document.createTextNode(" ");
    range.insertNode(space);

    selection.removeAllRanges();
    selection.addRange(range);
    selection.collapseToEnd();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tagList.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="px-4 py-2 flex gap-1 bg-blue-400 hover:bg-blue-600 text-white rounded-md"
          >
            {tag}
          </button>
        ))}
      </div>

      <div
        ref={divRef}
        className="outline-none border border-gray-500 p-3 min-h-20 w-full whitespace-pre-wrap rounded-md"
        contentEditable
      />
    </div>
  );
};

export default TagInput;
