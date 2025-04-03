export const examples = [
  {
    id: 1,
    title: "HTML Basic Structure",
    description: "Learn the basic structure of an HTML document and understand the purpose of each element.",
    category: "structure",
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
    level: "beginner"
  },
  {
    id: 2,
    title: "Text Formatting",
    description: "Explore various text formatting tags to style your content and improve readability.",
    category: "text",
    code: `<p>This is <b>bold</b> text.</p>
<p>This is <strong>important</strong> text.</p>
<p>This is <i>italic</i> text.</p>
<p>This is <em>emphasized</em> text.</p>
<p>This is <mark>highlighted</mark> text.</p>
<p>This is <small>smaller</small> text.</p>
<p>This is <del>deleted</del> text.</p>
<p>This is <ins>inserted</ins> text.</p>
<p>This is <sub>subscript</sub> and <sup>superscript</sup> text.</p>`,
    level: "beginner"
  },
  {
    id: 3,
    title: "HTML Forms",
    description: "Create interactive forms to collect user data with various input types and controls.",
    category: "forms",
    code: `<form action="/submit" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
  </div>
  
  <div>
    <label for="country">Country:</label>
    <select id="country" name="country">
      <option value="usa">USA</option>
      <option value="canada">Canada</option>
      <option value="uk">UK</option>
      <option value="australia">Australia</option>
    </select>
  </div>
  
  <div>
    <label>Interests:</label>
    <input type="checkbox" id="coding" name="interest" value="coding">
    <label for="coding">Coding</label>
    <input type="checkbox" id="design" name="interest" value="design">
    <label for="design">Design</label>
  </div>
  
  <button type="submit">Submit</button>
</form>`,
    level: "intermediate"
  },
  {
    id: 4,
    title: "HTML Lists",
    description: "Learn how to create ordered, unordered, and definition lists to organize your content.",
    category: "lists",
    code: `<!-- Unordered List -->
<h3>Shopping List</h3>
<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Eggs</li>
  <li>Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
      <li>Oranges</li>
    </ul>
  </li>
</ul>

<!-- Ordered List -->
<h3>Recipe Instructions</h3>
<ol>
  <li>Preheat the oven to 350°F</li>
  <li>Mix all ingredients in a bowl</li>
  <li>Pour the mixture into a baking pan</li>
  <li>Bake for 30 minutes</li>
</ol>

<!-- Definition List -->
<h3>HTML Terms</h3>
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language - the standard markup language for creating web pages</dd>
  
  <dt>Tag</dt>
  <dd>A markup element that defines the structure and content of an HTML document</dd>
  
  <dt>Attribute</dt>
  <dd>Additional information about an HTML element</dd>
</dl>`,
    level: "beginner"
  },
  {
    id: 5,
    title: "HTML Tables",
    description: "Create structured tables to display tabular data with headers, rows, and columns.",
    category: "tables",
    code: `<table border="1">
  <caption>Monthly Savings</caption>
  <thead>
    <tr>
      <th>Month</th>
      <th>Income</th>
      <th>Expenses</th>
      <th>Savings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$3000</td>
      <td>$1500</td>
      <td>$1500</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$3200</td>
      <td>$1800</td>
      <td>$1400</td>
    </tr>
    <tr>
      <td>March</td>
      <td>$3500</td>
      <td>$2000</td>
      <td>$1500</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total Savings</td>
      <td>$4400</td>
    </tr>
  </tfoot>
</table>`,
    level: "intermediate"
  },
  {
    id: 6,
    title: "Links and Images",
    description: "Learn how to add links to other pages and display images in your HTML documents.",
    category: "links",
    code: `<!-- Basic Link -->
<p>Visit <a href="https://www.example.com">Example.com</a> for more information.</p>

<!-- Link with Title Attribute -->
<p>Learn more about <a href="https://developer.mozilla.org" title="MDN Web Docs">HTML documentation</a>.</p>

<!-- Link to Email -->
<p>Contact us at <a href="mailto:info@example.com">info@example.com</a>.</p>

<!-- Link that Opens in New Tab -->
<p>Visit <a href="https://www.w3schools.com" target="_blank">W3Schools</a> (opens in new tab).</p>

<!-- Basic Image -->
<img src="https://via.placeholder.com/300x200" alt="Placeholder Image">

<!-- Image with Width and Height -->
<img src="https://via.placeholder.com/150" alt="Small Placeholder" width="100" height="100">

<!-- Image as a Link -->
<a href="https://www.example.com">
  <img src="https://via.placeholder.com/200x100" alt="Click this image to go to Example.com">
</a>

<!-- Image with Caption using Figure -->
<figure>
  <img src="https://via.placeholder.com/400x300" alt="Landscape">
  <figcaption>Beautiful landscape image</figcaption>
</figure>`,
    level: "beginner"
  },
  {
    id: 7,
    title: "Semantic HTML",
    description: "Use semantic elements to give meaning to your page structure and improve accessibility.",
    category: "semantic",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic HTML Example</title>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="about">
      <h2>About Us</h2>
      <p>Welcome to our website. We are a company that specializes in web development.</p>
    </section>
    
    <section id="services">
      <h2>Our Services</h2>
      <article>
        <h3>Web Design</h3>
        <p>We create beautiful and responsive websites.</p>
      </article>
      <article>
        <h3>Web Development</h3>
        <p>We build robust web applications using modern technologies.</p>
      </article>
    </section>
    
    <aside>
      <h3>Latest News</h3>
      <p>We've just launched our new service!</p>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
    <address>
      Contact us at: <a href="mailto:info@example.com">info@example.com</a>
    </address>
  </footer>
</body>
</html>`,
    level: "intermediate"
  },
  {
    id: 8,
    title: "HTML Meta Tags",
    description: "Learn how to use meta tags to provide metadata about your HTML document.",
    category: "structure",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Basic Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="This is an example page demonstrating HTML meta tags">
  <meta name="keywords" content="HTML, meta tags, SEO, web development">
  <meta name="author" content="John Doe">
  
  <!-- Open Graph Meta Tags (for social media) -->
  <meta property="og:title" content="HTML Meta Tags Example">
  <meta property="og:description" content="Learn about HTML meta tags with this example">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/meta-tags">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="HTML Meta Tags Example">
  <meta name="twitter:description" content="Learn about HTML meta tags with this example">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  
  <!-- Refresh Meta Tag (redirect after 5 seconds) -->
  <!-- <meta http-equiv="refresh" content="5;url=https://example.com"> -->
  
  <title>HTML Meta Tags Example</title>
</head>
<body>
  <h1>HTML Meta Tags Example</h1>
  <p>This page demonstrates various HTML meta tags. View the source code to see them.</p>
</body>
</html>`,
    level: "intermediate"
  },
  {
    id: 9,
    title: "HTML Audio and Video",
    description: "Embed audio and video content in your web pages using HTML5 elements.",
    category: "links",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Audio and Video Example</title>
</head>
<body>
  <h1>HTML Audio and Video Example</h1>
  
  <section>
    <h2>Audio Example</h2>
    
    <!-- Basic Audio -->
    <h3>Basic Audio Player</h3>
    <audio controls>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    
    <!-- Audio with Attributes -->
    <h3>Audio with Attributes</h3>
    <audio controls autoplay loop muted>
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg">
      <source src="audio.ogg" type="audio/ogg">
      Your browser does not support the audio element.
    </audio>
  </section>
  
  <section>
    <h2>Video Example</h2>
    
    <!-- Basic Video -->
    <h3>Basic Video Player</h3>
    <video controls width="400">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support the video element.
    </video>
    
    <!-- Video with Attributes -->
    <h3>Video with Attributes</h3>
    <video controls width="400" poster="https://via.placeholder.com/400x225" preload="auto">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      <source src="video.webm" type="video/webm">
      <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
      Your browser does not support the video element.
    </video>
  </section>
</body>
</html>`,
    level: "intermediate"
  }
];
