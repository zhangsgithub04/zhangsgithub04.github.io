<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Window Variable Example</title>
</head>
<body>
  <h1>Check the Console for Global Variable</h1>

  <script>
    // Defining a variable
    const myVariable = {
      name: "Next.js",
      version: "12.3",
      isAwesome: true,
    };

    // Adding the variable to the window object
    window.myVariable = myVariable;

    // Now, you can access myVariable in the browser's console by typing:
    // myVariable
  </script>
</body>
</html>
