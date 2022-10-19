<template>
    <div class="spinner-handler">
        <div class="loading-spinner"></div>
    </div>
</template>

<style>
.spinner-handler {
  text-align: center;
  width: 100%;
}
.loading-spinner {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border-color: #34495E;
  border-top-color: transparent;
  border-width: 5px;
  border-style: solid;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>