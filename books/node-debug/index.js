

function app() {
  const arr = [...arguments];
  console.log(arr, Array.isArray(arr));
}

app(1, 2, 3);