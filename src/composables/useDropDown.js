import { computed, ref } from "vue";

export function useDropDown(){
    const dropDownName = ref('');

    const selectedItem = ref('');
    const isActive = ref(false);

    const activeClass = computed(()=>{
        return isActive.value ? 'dropdown-active' : 'dropdown-unactive';
    })

    function openSelectList(name){
        isActive.value = !isActive.value;
        dropDownName.value = dropDownName.value ? '':name;
    }

    function closeSelectList(){
        isActive.value = false;
        setTimeout(() => {
            dropDownName.value = '';
        }, 200);
    }

    function select(item){
        selectedItem.value = item;
        closeSelectList();
    }


    return {dropDownName,activeClass,selectedItem,select,openSelectList,closeSelectList}

}