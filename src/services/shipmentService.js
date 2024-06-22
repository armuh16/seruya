const shipmentRepository = require('../repositories/shipmentRepository');

async function addShipment(shipment) {
    const existingShipment = await shipmentRepository.shipmentExists(shipment.shipment_no);

    if (existingShipment) {
        if (existingShipment.shipment_status !== shipment.shipment_status) {
            const updatedShipment = await shipmentRepository.updateShipmentStatus(shipment.shipment_no, shipment.shipment_status);
            return updatedShipment;
        } else {
            throw new Error('Shipment with this number already exists');
        }
    }

    if (shipment.shipment_status === 'RUNNING') {
        await shipmentRepository.updatePreviousRunningShipments();
    }

    const newShipment = await shipmentRepository.createShipment(shipment);
    return newShipment;
}

module.exports = {
    addShipment,
};
