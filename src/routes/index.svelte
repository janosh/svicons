<script lang="ts">
  import GitHubCorner from '../components/GitHubCorner.svelte'
  import IconExplorer from '../components/IconExplorer.svelte'
  import PackSelect from '../components/PackSelect.svelte'
  import iconKeys from '../iconKeys'
  import packLengths from '../packLengths'

  const iconCount = packLengths.reduce(
    (acc: number, pack: [string, number]) => acc + pack[1],
    0
  )

  const iconNames = Object.entries(iconKeys).reduce(
    (acc: string[], [packName, arr]) => acc.concat(arr.map((s) => `${packName}/${s}`)),
    []
  )
</script>

<GitHubCorner href="https://github.com/janosh/svicons" />

<img src="svicons.svg" alt="Svicons" style="height: 6em; margin: 1em;" />

<p>
  <strong>{Object.keys(packLengths).length}</strong> Icon Packs totaling
  <strong>{iconCount.toLocaleString()}</strong> SVG Icons
</p>

<br />

<PackSelect {packLengths} />

<IconExplorer {iconNames} />

<style>
  :global(:root) {
    --ghc-color: var(--green);
  }
</style>
