<script lang="ts">
  import { Clear } from '$lib/material-rounded'
  import { filterPacks } from '../stores'
  import { titleCase } from '../utils'

  export let packLengths: [string, number][]

  const togglePack = (pack: string) => () => {
    if ($filterPacks.includes(pack)) $filterPacks = $filterPacks.filter((p) => p !== pack)
    else $filterPacks = [...$filterPacks, pack]
  }
</script>

<ul>
  {#each packLengths as [pack, count] (pack)}
    <li>
      <button class:active={$filterPacks.includes(pack)} on:click={togglePack(pack)}>
        {titleCase(pack)}
        <span>{count}</span>
      </button>
    </li>
  {/each}
  {#if $filterPacks.length > 0}
    <li>
      <button on:click={() => ($filterPacks = [])}>
        Clear selection <Clear width="10pt" style="vertical-align: -2pt;" />
      </button>
    </li>
  {/if}
</ul>

<style>
  ul {
    list-style: none;
    margin: auto;
    padding: 0 1em 2em;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1ex 1em;
    place-content: center;
    max-width: 60em;
    margin: 1em auto 2em;
    padding: 0 1ex;
  }
  ul button {
    background: rgba(0, 0, 0, 0.15);
  }
  ul button.active {
    background-color: rgba(0, 0, 0, 0.4);
  }
  ul li button span {
    background: #0071f0;
    padding: 0 2pt;
    margin-left: 1pt;
    border-radius: 3pt;
  }
  ul button {
    transition: 0.3s;
  }
  ul button:hover {
    transform: translateY(-1px);
    box-shadow: 0 1pt 1ex rgba(0, 0, 0, 0.4);
  }
</style>
