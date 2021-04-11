<script context="module">
  // import svgs from '../svgs.json'

  export async function load() {
    const { bootstrap } = {}

    return { props: { svgData: { bootstrap } } }
  }
</script>

<script>
  import IntersectionObserver from '../components/IntersectionObserver.svelte'
  // import CopyButton from '../components/CopyButton.svelte'
  // import iconKeys from '../iconKeys.json'
  import packLengths from '../packLengths.json'

  export let svgData

  let nVisibleIcons = 200
  let nVisiblePacks = 2
  let activePacks = []
  const togglePack = (pack) => () => {
    if (activePacks.includes(pack)) activePacks = activePacks.filter((p) => p !== pack)
    else activePacks = [...activePacks, pack]
  }
  const onIntersectIconEnd = () => (nVisibleIcons += 100)
  const onIntersectPackEnd = () => (nVisiblePacks += 100)

  let query = ``

  const iconCount = packLengths.reduce((acc, pack) => acc + pack[1], 0)

  const titleCase = (s) => s.substring(0, 1).toUpperCase() + s.substring(1)
  const toTitleCase = (str) => str.split(`-`).map(titleCase).join(` `)
</script>

<img src="svicons.svg" alt="Svicons" style="height: 6em; margin: 2em 1em 3em;" />

<p>
  <span>{Object.keys(packLengths).length}</span> Icon Packs totaling
  <span>{iconCount.toLocaleString()}</span> SVG Icons
</p>

<br />

<input name="Search" bind:value={query} placeholder="Search..." />
<ul class="tags">
  {#each packLengths as [pack, count] (pack)}
    <li>
      <button class:active={activePacks.includes(pack)} on:click={togglePack(pack)}>
        {toTitleCase(pack)}
        <span>{count}</span></button>
    </li>
  {/each}
</ul>
{#each Object.entries(svgData)
  .filter((pack) => activePacks.length === 0 || activePacks.includes(pack[0]))
  .slice(0, nVisiblePacks) as [name, pack]}
  <div>
    <h2>{toTitleCase(name)}</h2>
    <ul class="grid">
      {#each Object.entries(pack)
        .filter((svg) => !query || svg[0].includes(query))
        .slice(0, nVisibleIcons) as [key, svg]}
        <li>
          <small>{toTitleCase(key)}</small>
          <svg viewBox="0 0 16 16" fill="currentColor">{@html svg}</svg>
          <!-- <CopyButton>
        <code
        ><span class="builtin">import</span>
        <span class="symbol">{key}</span>
        <span class="builtin">from</span>
        <span class="str">'svicons/octicons/{key}.svelte'</span></code>
      </CopyButton> -->
        </li>
      {/each}
    </ul>
    <IntersectionObserver on:intersect={onIntersectIconEnd} top={400} />
  </div>
{/each}
<IntersectionObserver on:intersect={onIntersectPackEnd} top={600} />

<style>
  h2 {
    margin: 3em 0 1em 0;
  }
  span {
    background: #0071f0;
    padding: 1pt 2pt;
    border-radius: 3pt;
  }
  button {
    border: 1px solid;
    background: transparent;
  }
  ul {
    list-style: none;
    margin: auto;
    padding: 0 1em 2em;
  }
  ul.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1ex 1em;
    place-content: center;
    max-width: 60em;
    margin: 1em auto 2em;
    padding: 0 1ex;
    font-size: calc(0.85em + 0.1vw);
  }
  ul.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(5em, 1fr));
    grid-gap: 2em 3ex;
  }
  ul.grid li {
    background: rgba(0, 0, 0, 0.2);
    padding: 1.5ex;
    border-radius: 1ex;
    display: grid;
    gap: 1em;
    transition: 0.5s;
    cursor: pointer;
    word-break: break-word;
  }
  ul.grid li:hover {
    transform: translateY(-2pt);
    background: rgba(0, 0, 0, 0.3);
  }
  ul.grid li small {
    font-size: 1.4ex;
  }
  ul.grid li svg {
    align-self: end;
  }
  code {
    display: block;
    text-overflow: ellipsis;
  }
  code span.builtin {
    color: #499fff;
  }
  code span.symbol {
    color: orange;
  }
  code span.str {
    color: #f9e24c;
  }
  input {
    margin-bottom: 2em;
    font-size: 2ex;
    border: none;
    outline: none;
    padding: 4pt 1ex;
    border-radius: 1ex;
    color: inherit;
    background: rgba(0, 0, 0, 0.2);
  }
  input::placeholder {
    color: white;
  }
</style>
