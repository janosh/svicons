<script>
  export let content

  let btn

  function copy() {
    navigator.clipboard.writeText(content).then(
      () => {
        const innerHTML = btn.innerHTML
        btn.innerHTML = `Copied!`
        setTimeout(() => (btn.innerHTML = innerHTML), 2000)
      },
      (err) => {
        console.error(err)
        btn.innerText = `Error`
      }
    )
  }
</script>

<button on:click={copy} bind:this={btn}><slot /></button>

<style>
  button {
    color: white;
    display: block;
  }
</style>
