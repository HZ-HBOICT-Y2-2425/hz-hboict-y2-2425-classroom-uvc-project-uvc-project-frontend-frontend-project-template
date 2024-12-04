<script>
    import { baseInputClasses } from "$lib/formUtils";
    export let fieldName;
    export let fieldValue;
    export let type;
    export let placeholder;
</script>

<input id={fieldName} type={type} placeholder={placeholder}
    class="{baseInputClasses} {fieldValue === "" ? 'border-red-500' : 'border-gray-300'}"
/>