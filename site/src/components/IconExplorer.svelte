<script>
  import CopyButton from './CopyButton.svelte'
  import { pascalCase } from '../utils'
  import { filterPacks } from '../stores'

  export let icons

  let query = ``
  const nVisible = 100
  $: nPacks = $filterPacks.length

  $: filteredIcons = icons.filter(
    (icon) =>
      icon.includes(query) &&
      (nPacks === 0 || $filterPacks.some((pack) => icon.includes(pack)))
  )
</script>

<input type="search" bind:value={query} placeholder="Search..." />

{#if query || nPacks > 0}
  <p>
    <strong>{filteredIcons.length}</strong> matching icons
    {#if nPacks > 0}
      in <strong>{nPacks}</strong> pack{nPacks > 1 ? `s` : ``}
    {/if}
  </p>
{/if}

<ul>
  {#each filteredIcons.slice(0, nVisible) as key}
    <li>
      <strong>{pascalCase(key.split(`/`)[1])}</strong>
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
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14em, 1fr));
    grid-gap: 2em 3ex;
    padding: 0;
  }
  p strong {
    color: lightsalmon;
  }
  ul li {
    place-items: center;
    background: rgba(0, 0, 0, 0.2);
    padding: 2ex 1ex 1ex;
    border-radius: 1ex;
    display: grid;
    gap: 1em;
    transition: 0.5s;
    cursor: pointer;
    word-break: break-word;
  }
  ul li:hover {
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
