<script>
export default {
    name: "HighlightText",
    props: ["text", "highlightText"],
    methods: {
        getHighlight() {
            const { text, highlightText } = this;
            console.log(text, highlightText)
            if (!highlightText) {
                return <span> {this.text} </span>;
            }
            const textToMatch = text.toLowerCase(); // 统一大小写
            const keyWord = highlightText.toLowerCase();

            const matchIndex = textToMatch.indexOf(keyWord);
            const beforeStr = text.substr(0, matchIndex);
            const afterStr = text.substr(matchIndex + keyWord.length);
            const hitStr = text.substr(matchIndex, keyWord.length);
            const titleSpan =
                matchIndex > -1 ? (
                    <span>
                        {beforeStr}
                        <span class="high-light-text">{hitStr}</span>
                        {afterStr}
                    </span>
                ) : (
                    this.text
                );
            return <span>{titleSpan}</span>;
        },
    },
    render() {
        return this.getHighlight();
    },
};
</script>

<style lang="scss" scoped>
.high-light-text {
    color: $blue;
}
</style>