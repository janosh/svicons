<script>
  import CopyButton from './CopyButton.svelte'
  import { pascalCase } from '../utils'
  import { filterPacks } from '../stores'

  export let icons

  let query = ``

  $: filteredIcons = icons.filter(
    (icon) =>
      icon.includes(query) &&
      ($filterPacks.length === 0 || $filterPacks.some((pack) => icon.includes(pack)))
  )
  const nVisible = 100
</script>

<input name="Search" bind:value={query} placeholder="Search..." />

{#if query || $filterPacks.length > 0}
  <p>{filteredIcons.length} matching icons</p>
{/if}

<ul class="grid">
  {#each filteredIcons.slice(0, nVisible) as key}
    <li>
      {#await import(`./icons/${key}.svelte`) then Component}
        <Component.default width="100" />
      {/await}
      <code>
        <div>
          <span class="builtin">import</span>
          <span class="symbol">{pascalCase(key.split(`/`)[1])}</span>
          <span class="builtin">from</span>
          <span class="str">'@svicons/{key}.svelte'</span>
        </div>
        <CopyButton
          content="import {pascalCase(key.split(`/`)[1])} from '@svicons/{key}.svelte'" />
      </code>
      <!-- <code>
        <span class="builtin">npm i</span>
        <span class="str">-D</span>
        <span class="symbol">@svicons/{key.split(`/`)[0]}</span>
      </code> -->
    </li>
  {/each}
</ul>

<style>
  ul.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
    grid-gap: 2em 3ex;
  }
  ul.grid li {
    place-items: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 2ex 1ex;
    border-radius: 1ex;
    display: grid;
    gap: 1em;
    transition: 0.5s;
    cursor: pointer;
    word-break: break-word;
  }
  ul.grid li:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.25);
  }
  input {
    margin-bottom: 2em;
    font-size: 14pt;
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
  code {
    display: flex;
    gap: 1ex;
    place-items: center;
    text-overflow: ellipsis;
    font-size: 9pt;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 2pt;
    border-radius: 1ex;
  }
  code span.builtin {
    color: white;
  }
  code span.symbol {
    color: lightblue;
  }
  code span.str {
    color: lightsalmon;
  }
</style>
