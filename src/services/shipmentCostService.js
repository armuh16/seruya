const shipmentCostRepository = require('../repositories/shipmentCostRepository');

async function addShipmentCost(shipmentCost) {
    const existingShipmentCost = await shipmentCostRepository.shipmentCostExists(shipmentCost.driver_code, shipmentCost.shipment_no);

    if (existingShipmentCost) {
        if (existingShipmentCost.total_costs !== shipmentCost.total_costs || existingShipmentCost.cost_status !== shipmentCost.cost_status) {
            const updatedShipmentCost = await shipmentCostRepository.updateShipmentCost(
                shipmentCost.driver_code,
                shipmentCost.shipment_no,
                shipmentCost.total_costs,
                shipmentCost.cost_status
            );
            return updatedShipmentCost;
        } else {
            throw new Error('Shipment cost with this driver and shipment already exists with the same data');
        }
    }

    const newShipmentCost = await shipmentCostRepository.createShipmentCost(shipmentCost);
    return newShipmentCost;
}

module.exports = {
    addShipmentCost,
};
