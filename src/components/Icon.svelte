<script>
  import svgData from '../svgs.json'

  export let key

  $: [pack, name] = key.split(`:`)
</script>

<svg>
  {@html svgData[pack][name]}
</svg>
