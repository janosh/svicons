<script>
  import Bootstrap from '../icons/bootstrap'
  // import Octicons from '../icons/octicons'
  import IntersectionObserver from '../components/IntersectionObserver.svelte'
  import CopyButton from '../components/CopyButton.svelte'

  let query
  let nVisible = 24
  const onIntersect = () => (nVisible += 12)

  $: filtered = Bootstrap.filter((itm) => !query || itm.slug.includes(query))
  $: visible = filtered.slice(0, nVisible)

  // https://stackoverflow.com/a/54651317
  const clearAndUpper = (str) => str.replace(/-/, ``).toUpperCase()
  const toPascalCase = (str) => str.replace(/(^\w|-\w)/g, clearAndUpper)
</script>

<input name="Search" bind:value={query} placeholder="Search..." />

<div class="grid">
  <!-- <Alarm width="10em" />
  <Hdd width="10em" /> -->
  {#each Bootstrap.slice(0, 20) as [Icon, name]}
    <div>
      <Icon width="6em" height="6em" />
      <CopyButton>
        <code
          ><span class="builtin">import</span>
          <span class="symbol">{toPascalCase(name)}</span>
          <span class="builtin">from</span>
          <span class="str">'svicons/octicons/{name}.svelte'</span></code>
      </CopyButton>
    </div>
  {/each}
</div>
<IntersectionObserver on:intersect={onIntersect} top={400} />

<style>
  div.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    grid-gap: 1em;
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
    background: black;
  }
  input::placeholder {
    color: white;
  }
</style>
