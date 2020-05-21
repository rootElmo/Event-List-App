import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    pageComponentsContainer: {
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '100%'
    },
    searchContainer: {
        padding: 5,
        backgroundColor: 'white'
    },
    eventListButtons: {
        height: 60,
        backgroundColor: 'lightblue',
        marginTop: 5,
        justifyContent: 'space-evenly',
        paddingHorizontal: 120
    },
    eventListSeparator: {
        height: 1,
        width: "100%",
        backgroundColor: "grey",
        opacity: 0.35
    },
    eventListFooter: {
        width: '100%',
        height: 240,
        backgroundColor: '#f5f5f5'
    },
    emptyListContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 40,
        width: '10%'
    },
    listItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: '2%'
    },
    listItemText: {
        fontSize: 14,
        width: 200,
        color: 'grey'
    }
})