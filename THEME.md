# Style Guide

Global Color Scheme

```css
:root {
  --primary: blue;
  --secondary: #272b33; /* grey */
  --success: green;
  --danger: red;
  --warning: yellow;
  --info: #4d4dff; /* indigo */
  --light: white;
  --off-black: #010409;
  --black: #090909;

  /* Gold Theme */
  --gold-light: #4a4537;
  --gold-bg: #150d07;
  --gold-bg-dark: #101010;

  /* Grey Theme */
  --grey-light: #484848;
  --grey-bg: #2b2b2b;
  --grey-bg-dark: #0c0c0c;

  /* Blue Theme */
  /* --blue-bg: #0d0d1a;
  --blue-bg-dark: #101010;
  --blue-light: #4a4537; */

}
```

## Body & Root Theme

```css
body {
  background-color: var(--off-black);
  color: var(--light);
}
```

```css
#root {
  background-color: var(--off-black);
}
```

## Main.jsx Theme

```css
.main-view,
.sidebar,
.main-header,
.main-footer {
  background-color: var(--gold-bg-dark);
}
```

```css
.main-header {
  background-image: url("../assets/grey_abstract_top.png");
}
```

```css
.sidebar {
  background-image: url("../assets/grey_abstract.png");
}

.sidebar .card-btn {
  background-color: transparent;
  color: var(--light);
}

.sidebar:hover .card-btn:hover {
  background-color: var(--gold-bg-dark);
}
```

```css
.main-footer {
  background-image: url("../assets/grey_abstract_bottom.png");
}
```
