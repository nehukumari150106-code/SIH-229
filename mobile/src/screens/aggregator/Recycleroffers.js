import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import styles from "./aggregatorstyles";

const offers = [
  {
    company: "EcoRecycle Pvt. Ltd.",
    lot: "LOT-1024",
    material: "PCB",
    weight: "25 kg",
    price: "â‚¹420/kg",
  },
  {
    company: "Green Earth Recyclers",
    lot: "LOT-1025",
    material: "Cable",
    weight: "40 kg",
    price: "â‚¹310/kg",
  },
];

const RecyclerOffers = () => {

  const acceptOffer = (company) => {
    alert("Offer accepted from " + company);
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Recycler Offers
        </Text>

        <Text style={styles.headerSubtitle}>
          Review offers from recyclers
        </Text>
      </View>

      <View style={styles.content}>

        {offers.map((offer) => (

          <View style={styles.card} key={offer.lot}>

            <View style={styles.row}>
              <Text style={styles.cardTitle}>
                {offer.company}
              </Text>

              <Text style={styles.status}>
                Pending
              </Text>
            </View>

            <Text style={styles.cardText}>
              {offer.lot}
            </Text>

            <Text style={styles.cardText}>
              {offer.material} â€¢ {offer.weight}
            </Text>

            <Text style={styles.price}>
              {offer.price}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => acceptOffer(offer.company)}
            >
              <Text style={styles.buttonText}>
                Accept Offer
              </Text>
            </TouchableOpacity>

          </View>

        ))}

      </View>
    </ScrollView>
  );
};

export default RecyclerOffers;