import 'package:flutter/material.dart';
import 'package:my_app/responsive.dart';
import '../../../constants.dart';

import '../../components/background.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var heading = '\$2300 per month';
    var subheading = '2 bed, 1 bath, 1300 sqft';
    var cardImage = AssetImage('assets/ie.jpeg');
    var supportingText = 'Beautiful home to rent ...';

    return Center(
        child: Card(
            elevation: 10.0,
            child: Column(
              children: [
                SizedBox(
                  height: 500.0,
                  width: 300.0,
                  child: Image(
                    image: cardImage,
                    height: 200,
                  ),
                ),
                Container(
                  padding: EdgeInsets.all(5.0),
                  alignment: Alignment.centerLeft,
                  child: Text(supportingText),
                ),
                ButtonBar(
                  children: [
                    TextButton(
                      child: const Text('CONTACT AGENT'),
                      onPressed: () {/* ... */},
                    ),
                    TextButton(
                      child: const Text('LEARN MORE'),
                      onPressed: () {/* ... */},
                    )
                  ],
                )
              ],
            )));
  }
}


//           ],
//         elevation: 20,
//         color: kPrimaryLightColor,
//         child: Padding(
//           padding: EdgeInsets.all(160.0),
//           child: Column(
//             mainAxisSize: MainAxisSize.min,
//             children: <Widget>[
              

//             ])
          
          
//           ),
          
//     ));
//   }
// }
