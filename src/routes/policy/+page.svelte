<script>
	import { Card } from '$lib/components/shad/ui/card/index.js';
</script>

<svelte:head>
	<title>BitHunt - Privacy Policy</title>
</svelte:head>

<Card class="flex min-h-full w-full flex-col items-start overflow-auto p-6 text-sm lg:w-1/2">
	<div class="w-full text-center">
		<h1 class="w-full text-center text-4xl font-black">PRIVACY POLICY</h1>
		<h2 class="w-full text-center text-lg font-thin">
			<span class="font-black">Last Updated:</span> 14/09/2025.
		</h2>
	</div>

	<div id="summary">
		<h1 class="mt-2 text-xl font-bold">tl;dr (Summary)</h1>

		<ul class="ml-4 list-disc">
			<li>We only collect your name and Student Number for BitHunt.</li>
			<li>The data we collect is used for BitHunt and not given to third parties.</li>
			<li>
				Your Student Number will be used to register you, for free, to CS++ if you are not already a
				member.
			</li>
			<li>
				While the event is live, you have the right to ask for a copy of it, or have it removed.
			</li>
			<li>This data is deleted after the event.</li>
		</ul>
	</div>

	<div id="collection">
		<h1 class="mt-2 text-xl font-bold">Data Collection</h1>
		<p>We collect the following personal data:</p>

		<ul class="ml-4 list-disc">
			<li>Student Numbers</li>
			<li>Student Names</li>
		</ul>

		<p>
			This data is collected exclusively for the purpose of BitHunt, and to register you as a member
			of CS++, for free. This information will not be used for any other purpose, or transferred to
			third parties.
		</p>
	</div>

	<div id="usage">
		<h1 class="mt-2 text-xl font-bold">Usage of Data</h1>
		<p>The data we collect is used for the following purposes:</p>

		<ul class="ml-4 list-disc">
			<li>Letting players log in & play BitHunt</li>
			<li>Verifying winners</li>
			<li>Registering players as CS++ members, for free</li>
		</ul>
	</div>

	<div id="storage">
		<h1 class="mt-2 text-xl font-bold">Data Storage and Protection</h1>
		<p>
			We employ reasonable data protection measures to safeguard the data collected. Your data is
			stored securely, and is accessible only to authorised personnel of the CS++ Society.
		</p>
	</div>

	<div id="rights">
		<h1 class="mt-2 text-xl font-bold">User Rights</h1>
		<p>As a player of BitHunt, you have the rights to:</p>

		<ul class="ml-4 list-disc">
			<li>Request a copy of the data we have about you.</li>
			<li>Update or modify your data if it is correct.</li>
			<li>Request the removal of your data from our systems.</li>
		</ul>
	</div>

	<div id="removal">
		<h1 class="mt-2 text-xl font-bold">Data Removal</h1>
		<p>
			Your data will be automatically removed at the end of the game you have competed in, and after
			you have been registered as a member of CS++. Should you wish to have your data removed before
			this, you can sent a request to CS++.
		</p>
	</div>

	<div id="change">
		<h1 class="mt-2 text-xl font-bold">Changes to the Privacy Policy</h1>
		<p>
			We reserve the right to make changes to this Privacy Policy at our discretion. All changes
			will be added to this page. We encourage our users to check this policy regularly.
		</p>
	</div>

	<div id="contact">
		<h1 class="mt-2 text-xl font-bold">Contacting CS++</h1>
		<p>
			If you have questions or concerns relating to this Privacy Policy, our data practices, or
			BitHunt, please contact CS++ at:
		</p>

		<p>
			<a
				href="mailto:comp@societies.tudublin.ie?subject=BitHunt Privacy Policy"
				class="font-bold text-blue-500">comp@societies.tudublin.ie</a
			>
		</p>
	</div>
</Card>
