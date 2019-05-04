import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, ScrollView} from 'react-native';
import {View, Text, Button, Image} from 'react-native-ui-lib';

const width = Dimensions.get('window').width;

class CocktailDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('description'),
        headerStyle: {
            backgroundColor: '#2b93a7',
            textAlign: 'center'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
    });

    render() {
        let details = this.props.navigation.getParam('details');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4EBCD1' }}>
                <ScrollView>
                    <View style={{width: width * .9, backgroundColor: '#ade0ea', margin: 10, display: 'flex', flexDirection: 'column'}}>
                        <Image
                            style={{width: 300, height: 250, margin: 10, borderRadius: 10}}
                            source={{uri: details.strDrinkThumb}}
                        />
                        {(details && details.ingredients) ?
                            details.ingredients.map(ingr => {
                                return (
                                    <Text style={{fontSize: 17, textAlign: 'left', marginLeft: 10}} key={ingr}>
                                        {ingr}
                                    </Text>
                                )
                            }) :
                            null
                        }
                        <View>
                            <Text style={{fontSize: 17, textAlign: 'left', margin: 10}}>{'\u2022'} How to prepare</Text>
                            <Text style={{fontSize: 16, textAlign: 'left', margin: 10}}>{details.strInstructions}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

CocktailDetailScreen.propTypes = {
    data: PropTypes.object,
    dataList: PropTypes.arrayOf(PropTypes.number),
    fetchSettings: PropTypes.func,
};

export default CocktailDetailScreen;
