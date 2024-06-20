for (let i = 0; i < boxes.length; i++) {
    const currentBox = boxes[i]; // Cache the current box element
  
    input2.addEventListener("input", (e) => {
      currentBox.style.backgroundColor = e.target.value;
    });
  }
