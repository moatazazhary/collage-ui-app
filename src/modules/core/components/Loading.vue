<template>

<div class="absolute top-0 left-0 w-full flex items-center justify-center h-screen z-30 backdrop-blur-sm">
	<div class="wrapper">
		<div class="cssload-loader"></div>
	</div>
</div>
</template>

<style scoped>
    .wrapper {
	padding-left: 1em;
	padding-right: 1em;
	margin: auto;
	display: block;
	width: 195px;
}

.cssload-loader {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin: 3em;
	display: inline-block;
	position: relative;
	vertical-align: middle;
}

.cssload-loader {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin: 3em;
	display: inline-block;
	position: relative;
	vertical-align: middle;
}
.cssload-loader,
.cssload-loader:before,
.cssload-loader:after {
	animation: 0.8s infinite ease-in-out;
		-o-animation: 0.8s infinite ease-in-out;
		-ms-animation: 0.8s infinite ease-in-out;
		-webkit-animation: 0.8s infinite ease-in-out;
		-moz-animation: 0.8s infinite ease-in-out;
}
.cssload-loader:before,
.cssload-loader:after {
	width: 100%; 
	height: 100%;
	border-radius: 50%;
	position: absolute;
	top: 0;
	left: 0;
}

.cssload-loader:before,
.cssload-loader:after {
		content: "";
}

.cssload-loader:before,
.cssload-loader:after {
		content: "";
		background-color: var(--color-primary);
		transform: scale(0);
		-o-transform: scale(0);
		-ms-transform: scale(0);
		-webkit-transform: scale(0);
		-moz-transform: scale(0);
		animation: cssload-animation 1.145s infinite ease-in-out;
		-o-animation: cssload-animation 1.145s infinite ease-in-out;
		-ms-animation: cssload-animation 1.145s infinite ease-in-out;
		-webkit-animation: cssload-animation 1.145s infinite ease-in-out;
		-moz-animation: cssload-animation 1.145s infinite ease-in-out;
}
.cssload-loader:after { animation-delay: 0.5925s;
		-o-animation-delay: 0.5925s;
		-ms-animation-delay: 0.5925s;
		-webkit-animation-delay: 0.5925s;
		-moz-animation-delay: 0.5925s; }

.cssload-loader:after {
		background-color: var(--color-secondary);
    }

@keyframes cssload-animation {
	0%	 { transform: translateX(-100%) scale(0); }
	50%	{ transform: translateX(0%)		scale(1); }
	100% { transform: translateX(100%)	scale(0); }
}

@-o-keyframes cssload-animation {
	0%	 { -o-transform: translateX(-100%) scale(0); }
	50%	{ -o-transform: translateX(0%)		scale(1); }
	100% { -o-transform: translateX(100%)	scale(0); }
}

@-ms-keyframes cssload-animation {
	0%	 { -ms-transform: translateX(-100%) scale(0); }
	50%	{ -ms-transform: translateX(0%)		scale(1); }
	100% { -ms-transform: translateX(100%)	scale(0); }
}

@-webkit-keyframes cssload-animation {
	0%	 { -webkit-transform: translateX(-100%) scale(0); }
	50%	{ -webkit-transform: translateX(0%)		scale(1); }
	100% { -webkit-transform: translateX(100%)	scale(0); }
}

@-moz-keyframes cssload-animation {
	0%	 { -moz-transform: translateX(-100%) scale(0); }
	50%	{ -moz-transform: translateX(0%)		scale(1); }
	100% { -moz-transform: translateX(100%)	scale(0); }
}
</style>