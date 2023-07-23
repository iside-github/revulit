export function getHits(setCount, id) {
  const tbody = document.querySelector("tbody");
  const tableHead = document.querySelector("thead");
  const valueLength = tbody.childNodes?.length;

  setCount(valueLength);

  tbody.childNodes.forEach((node, indx) => {
    node.childNodes.forEach((item, indx) => {
      if (indx === 2) {
        item.classList.add("to_align");
      }
      if (indx === 1) {
        item.classList.add("to_self_align");
      }
      if (indx === 8 || indx === 9) {
        item.classList.add("to_remove");
      }
    });
    if (!node.lastChild.textContent.toLowerCase() === id.toLowerCase()) {
      node.classList.add("to_remove");
    } else {
      if (
        node.lastChild.textContent
          .toLowerCase()
          .replace(/\s/g, "")
          .includes("compositenon-processable")
      ) {
        node.classList.add("to_active");
      } else {
        node.classList.add("to_active");
      }
    }
  });

  const allActive = document.querySelectorAll(".to_active");

  allActive.forEach((doc, indx) => {
    doc.firstChild.textContent = indx + 1;
  });

  tableHead.firstChild.childNodes.forEach((node, index) => {
    if (index > 2) {
      node.classList.add("fixed_width");
    }
    if (index === 8 || index === 9) {
      node.classList.add("to_remove");
    }
  });
}

export function getAll(setCount, id) {
  const tbody = document.querySelector("tbody");
  const tableHead = document.querySelector("thead");
  const valueLength = tbody.childNodes?.length;

  setCount(valueLength);

  tbody.childNodes.forEach((node, indx) => {
    node.firstChild.textContent = indx + 1;
    node.childNodes.forEach((item, indx) => {
      if (indx === 2) {
        item.classList.add("to_align");
      }
      if (indx === 1) {
        item.classList.add("to_self_align");
      }
      if (indx === 8 || indx === 9) {
        item.classList.add("to_remove");
      }
    });
  });

  tableHead.firstChild.childNodes.forEach((node, index) => {
    if (index > 2) {
      node.classList.add("fixed_width");
    }
    if (index === 8 || index === 9) {
      node.classList.add("to_remove");
    }
  });
}
