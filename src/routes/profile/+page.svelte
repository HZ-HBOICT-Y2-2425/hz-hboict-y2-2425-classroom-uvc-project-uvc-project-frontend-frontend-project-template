<script>
    import { user } from "$lib/store";
</script>

<div>
    <p>Name: {$user.name}</p>
    <p>Email: {$user.email}</p>
    <p>Zipcode: {$user.zipcode}</p>
    <p>CO2 Bijdrage: {$user.co2Contribution}</p>
    <!-- <a href="/profile/update" class="bg-black text-white text-sm px-3 py-1">Update</a> -->
</div>