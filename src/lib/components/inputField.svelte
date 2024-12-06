<script>
    import { baseInputClasses } from "$lib/formUtils";
    export let id;
    export let type;
    export let placeholder;
    export let defaultValue;
    export let fieldValue;
</script>

<input id={id} type={type} placeholder={placeholder} value={defaultValue}
    class="{baseInputClasses} {fieldValue === "" ? 'border-red-500' : 'border-gray-300'}"
/>