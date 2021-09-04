<script lang="ts">
  import IconExplorer from '../components/IconExplorer.svelte'
  import PackSelect from '../components/PackSelect.svelte'
  import iconKeys from '../iconKeys.json'
  import packLengths from '../packLengths.json'

  const iconCount = packLengths.reduce(
    (acc: number, pack: [string, number]) => acc + pack[1],
    0
  )

  const icons = Object.entries(iconKeys).reduce(
    (acc: string[], [packName, arr]) => acc.concat(arr.map((s) => `${packName}/${s}`)),
    []
  )
</script>

<img src="svicons.svg" alt="Svicons" style="height: 6em; margin: 1em;" />

<p>
  <span>{Object.keys(packLengths).length}</span> Icon Packs totaling
  <span>{iconCount.toLocaleString()}</span> SVG Icons
</p>

<br />

<PackSelect {packLengths} />

<IconExplorer {icons} />
