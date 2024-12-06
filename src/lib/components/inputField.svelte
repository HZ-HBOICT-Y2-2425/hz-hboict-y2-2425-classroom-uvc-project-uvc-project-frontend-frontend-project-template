<script>
    import { baseInputClasses } from "$lib/formUtils";
    export let parameterObject;
</script>

<input 
    id={parameterObject.id} 
    type={parameterObject.type? parameterObject.type : "text"} 
    placeholder={parameterObject.placeholder} 
    value={parameterObject.defaultValue? parameterObject.defaultValue : ""}
    class="{baseInputClasses} {parameterObject.field === "" ? 'border-red-500' : 'border-gray-300'}"
/>