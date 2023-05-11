<!-- eslint-disable vue/html-indent -->
<template>
    <div>
        DataExport page
        <a-carousel :after-change="onChange">
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
        </a-carousel>
    </div>
</template>

<script>
export default {
    name: 'DataExport',
    methods: {
        onChange(a, b, c) {
            console.log(a, b, c)
        }
    }
}
</script>

<style lang='less' scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
