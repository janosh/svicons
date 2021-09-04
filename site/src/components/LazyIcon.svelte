<script>
  export let iconPath
</script>

{iconPath}
{#await import(`./icons/bootstrap/${iconPath}.svelte`).then((module) => module.default) then Icon}
  <Icon />
{/await}

<!-- <CopyButton> -->
<code
  ><span class="builtin">import</span>
  <span class="symbol">{iconPath}</span>
  <span class="builtin">from</span>
  <span class="str">'svicons/octicons/{iconPath}.svelte'</span></code>

<!-- </CopyButton> -->
<style>
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
</style>
