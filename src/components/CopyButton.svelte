<script lang="ts">
  import { Copy as CopyIcon } from '$lib/fa-regular'
  import { Check } from '$lib/octicons'

  export let content: string
  export let duration = 1000

  let showCheck = false

  async function copy() {
    try {
      await navigator.clipboard.writeText(content)
      showCheck = true
      setTimeout(() => (showCheck = false), duration)
    } catch (err) {
      console.error(err)
    }
  }
</script>

<button on:click={copy}>
  {#if showCheck}
    <Check width="12pt" style="vertical-align: -4px;" />
  {:else}
    <CopyIcon width="12pt" style="vertical-align: -4px;" />
  {/if}
</button>

<style>
  button {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
