export interface ProjectDetails {
  title: string;
  description: string;
  additionalDetails: string;
}

export const projects: Record<string, ProjectDetails> = {
  website: {
    title: `
    My motivation for this site
    `,
    description: `
    <p class="">So, I built this website as a personal playground, 
      a space where I can test out different functionalities 
      that I might want to use in other projects.</p>
    
    <p class="mt-6">The site itself is built using Next.js on top of a MERN stack. 
      For hosting, I’m hosting frontend using Netlify, backend using Render, 
      and cronjob.org to keep the server up since Render spins down inactivity every 15 mins.</p>

      <p class="mt-6">Here’s what I’ve got up and running so far:</p>

        <ul class="list-none py-4  space-y-2">
          <li>
            <span class="badge badge-xs badge-outline badge-secondary shadow-glowSecondary"></span>
            <span class="ml-2">Users can sign up and log in, with authentication handled through JWT (JSON Web Tokens)</span>
          </li>
          <li>
            <span class="badge badge-xs badge-outline badge-secondary shadow-glowSecondary"></span>
            <span class="ml-2">A blog feature with full CRUD capabilities: Create, Read, Update, Delete</span>
          </li>
          <li>
            <span class="badge badge-xs badge-outline badge-secondary shadow-glowSecondary"></span>
            <span class="ml-2">Access is controlled through role-based permissions</span>
          </li>
        </ul>
    `,
    additionalDetails: `
      <h2 class="mt-4 mb-4 text-lg font-bold">Frontend</h2>
      <p class="mt-4">I decided to go with Next.js because it's a bit more opinionated, which guides me through the best practices when I’m building. 
      The server-side rendering (SSR) that Next.js offers boosts performance when I don’t want to render client side, 
      and the app router keeps me disciplined in how I structure my pages and components, although the slug is a bit tricky to implement.</p>

      <p class="mt-4">For styling, I’m using Tailwind and daisyUI. Tailwind gives me a lot of control, which I really like, 
      and daisyUI helps simplify things when I want to use reusable components. However, it can get pretty verbose, 
      and keeping track of "which className is doing what for which component" can be a bit of a headache.</p>

      <p class="mt-4">Early on in my journey as a developer, I learned the importance of type safety, 
      so I chose TypeScript over JSX for the frontend. It makes managing state a little easier as the app grows in complexity.</p>

      <h2 class="mt-4 mb-4 text-lg font-bold">Backend</h2>
      <p class="mt-4">On the backend, I  went with JavaScript instead of TypeScript because MongoDB's schemaless nature can introduce some typing complexities 
      that might slow down development, and since I'm using a REST API that doesn't deal with a bunch of states, I figured it was a fair trade-off.</p>

      <p class="mt-4">This might not the most ideal approach from a safety standpoint, but I’m leaning on the frontend to handle the heavy lifting. 
      In essence, I’m trading a bit of safety for speed. Not ideal, but it’s a fair tradeoff for my use case. 
      I might refactor the backend when the application somehow scales.</p>

      <p class="mt-4">Another reason I use JavaScript is that it lets me write the whole stack in a single language, 
      which makes context switching between the frontend and the database a lot simpler. 
      I understand that JavaScript might be slower than other backend languages like Go, 
      but personally, my focus right now is more towards learning how to implement things and not confusing syntax error with business logic.</p>

      <p class="mt-4">I’m following the MVC (Model-View-Controller) pattern because it keeps a good separation between the data and business logic. 
      This way, I don’t have to stress about breaking the controller whenever I tweak the data model or build a middleware.</p>

      <p class="mt-4">And for the backend framework, I chose Express.js because it takes care of a lot of the heavy lifting. 
      I don’t think I can write my CORS logic at this point in my learning curve. 
      Also, Express has a huge ecosystem of middleware, which makes it easier to manage things like routing, authentication, and error handling.</p>
    `,
  },
  Aquila: {
    title: `
      Aquila is a social network that focuses on improving relationships without the noise of media
    `,
    description: `
    <ul class="menu bg-base-200 w-64 rounded-box p-2 space-y-2">
      <li>
        <a href="https://shorturl.at/bGXY2" class="flex items-center px-4 py-3 hover:bg-secondary hover:text-secondary-content hover:font-semibold active:bg-primary transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Project Summary</span>
        </a>
      </li>
      <li>
        <a href="https://shorturl.at/fjWZ7" class="flex items-center px-4 py-3 hover:bg-secondary hover:text-secondary-content hover:font-semibold active:bg-primary transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>UX prototype</span>
        </a>
      </li>
    </ul>    `,
    additionalDetails: `      
    <h2 class="mt-4 mb-4 text-lg font-bold">Problem</h2>
      <p class="mt-4">In today’s social media landscape, platforms like Instagram and Facebook prioritize content-driven engagement. 
      Users are often overwhelmed with reels, posts, and advertisements, 
      which shift the focus away from the original purpose of social networks: fostering genuine relationships.</p>

      <p class="mt-4">I believe the essence of social interaction has been lost, replaced by the relentless pursuit of likes, shares, and followers.</p>

    <h2 class="mt-8 mb-4 text-lg font-bold">Solution</h2>
      <p class="mt-4 mb-4">Aquila is an attempt to reimagine the social networking experience by centering it around meaningful relationships rather than content consumption. 
      You can exchange gifts with your friends and families, have more meaningful catchups.</p>`,
  },
  Journal: {
    title: `
      I'm an currently developing a personal journal app for myself and open to friends and family.
    `,
    description: `
    <p>So, I've always enjoyed writing stuff down and keeping track of my thoughts. But lately, I have been using LLMs as part of the process, more often than not.</p>
        
    <p class="mt-4">Instead of writting in a regular doc, I've started to document my thoughts through chatGPT's custom AI. It's like... journaling, with a twist. And it's got me thinking, why not just combine them?</p>
        
    <p class="mt-4">So, I wanted to develop the LLM powered journal app that provides both traditional journalling capability and LLM powered capablities.</p>
                
    <p class="mt-4">You might ask me: </p> 
    
    <p> Why go through the hassle to build an app when you can just find one and download it? </p> 
    
    <p class="mt-4">My answer is, and I quote Fireship.io (tech youtuber) </p> 
    <p class="mt-4 font-semibold text-secondary">We develop something not because it is easy, but because we thought it was easy </p>
    <p class="mt-4">Jokes aside, I just want to bulid something cool and useful!</p>
  `,
    additionalDetails: `<p class="my-4"> I'll post updates here when it's available</p>
`,
  },
};
