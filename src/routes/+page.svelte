<script lang="ts">
  import GitHubCorner from 'svelte-github-corner'
  import IconExplorer from '../components/IconExplorer.svelte'
  import PackSelect from '../components/PackSelect.svelte'
  import icon_keys from '../icon-keys'
  import pack_lengths from '../pack-lengths'

  const iconCount = pack_lengths.reduce(
    (acc: number, pack: [string, number]) => acc + pack[1],
    0
  )

  const iconNames = Object.entries(icon_keys).reduce(
    (acc: string[], [packName, arr]) => acc.concat(arr.map((s) => `${packName}/${s}`)),
    []
  )
</script>

<GitHubCorner href="https://github.com/janosh/svicons" --ghc-color="var(--green)" />

<img src="svicons.svg" alt="Svicons" style="height: 6em; margin: 1em;" />

<p>
  <strong>{Object.keys(pack_lengths).length}</strong> Icon Packs totaling
  <strong>{iconCount.toLocaleString()}</strong> SVG Icons
</p>

<br />

<PackSelect {pack_lengths} />

<IconExplorer {iconNames} />
