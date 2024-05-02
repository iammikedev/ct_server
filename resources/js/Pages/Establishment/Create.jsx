// Note: This needs to be refactored by using PrimeReact components

// import { useForm, usePage } from '@inertiajs/react';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, FormErrorMessage, InputGroup, InputLeftAddon, Flex, useToast } from '@chakra-ui/react';

// export default function Create({ isOpen, onClose }) {
//     const toast = useToast();
//     const { data, setData, post, processing, errors, reset } = useForm({
//         first_name: '',
//         middle_name: '',
//         last_name: '',
//         email_address: '',
//         contact_number: '',
//         establishment_name: '',
//         address: '',
//         baranggay: '',
//         city: '',
//         lat: '',
//         lng: '',
//         status: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('establishment.store'), {
//             onSuccess: (page) => {
//                 toast({
//                     title: page.props.flash.message['title'],
//                     description: page.props.flash.message['description'],
//                     status: 'success',
//                     duration: 5000,
//                     isClosable: true,
//                 })

//                 onClose();
//                 reset();
//             }
//         });
//     }

//     return (
//         <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
//             <ModalOverlay />
//             <form onSubmit={submit}>
//                 <ModalContent>
//                     <ModalHeader>Add Establishment</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         {/* Establishment Name */}
//                         <FormControl isRequired isInvalid={errors.establishment_name}>
//                             <FormLabel>Establishment Name</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='establishment_name'
//                                 value={data.establishment_name}
//                                 onChange={(e) => setData('establishment_name', e.target.value)} />
//                             <FormErrorMessage>{errors.establishment_name}</FormErrorMessage>
//                         </FormControl>

//                         {/* First Name */}
//                         <FormControl mt={4} isRequired isInvalid={errors.first_name}>
//                             <FormLabel>First Name</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='first_name'
//                                 value={data.first_name}
//                                 onChange={(e) => setData('first_name', e.target.value)} />
//                             <FormErrorMessage>{errors.first_name}</FormErrorMessage>
//                         </FormControl>

//                         {/* Middle Name */}
//                         <FormControl mt={4} isInvalid={errors.middle_name}>
//                             <FormLabel>Middle Name</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='middle_name'
//                                 value={data.middle_name}
//                                 onChange={(e) => setData('middle_name', e.target.value)} />
//                             <FormErrorMessage>{errors.middle_name}</FormErrorMessage>
//                         </FormControl>

//                         {/* Last Name */}
//                         <FormControl mt={4} isRequired isInvalid={errors.last_name}>
//                             <FormLabel>Last Name</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='last_name'
//                                 value={data.last_name}
//                                 onChange={(e) => setData('last_name', e.target.value)} />
//                             <FormErrorMessage>{errors.last_name}</FormErrorMessage>
//                         </FormControl>

//                         {/* Email Address */}
//                         <FormControl mt={4} isRequired isInvalid={errors.email_address}>
//                             <FormLabel>Email Address</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='email_address'
//                                 value={data.email_address}
//                                 onChange={(e) => setData('email_address', e.target.value)} />
//                             <FormErrorMessage>{errors.email_address}</FormErrorMessage>
//                         </FormControl>

//                         {/* Contact Number */}
//                         <FormControl mt={4} isRequired isInvalid={errors.contact_number}>
//                             <FormLabel>Contact Number</FormLabel>
//                             <InputGroup>
//                                 <InputLeftAddon children='+63' />
//                                 <Input
//                                     type='number'
//                                     name='contact_number'
//                                     value={data.contact_number}
//                                     maxLength={11}
//                                     onChange={(e) => setData('contact_number', e.target.value)} />
//                             </InputGroup>
//                             <FormErrorMessage>{errors.contact_number}</FormErrorMessage>
//                         </FormControl>

//                         {/* Address */}
//                         <FormControl mt={4} isRequired isInvalid={errors.address}>
//                             <FormLabel>Address</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='address'
//                                 value={data.address}
//                                 onChange={(e) => setData('address', e.target.value)} />
//                             <FormErrorMessage>{errors.address}</FormErrorMessage>
//                         </FormControl>

//                         {/* Baranggay */}
//                         <FormControl mt={4} isRequired isInvalid={errors.baranggay}>
//                             <FormLabel>Baranggay</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='baranggay'
//                                 value={data.baranggay}
//                                 onChange={(e) => setData('baranggay', e.target.value)} />
//                             <FormErrorMessage>{errors.baranggay}</FormErrorMessage>
//                         </FormControl>

//                         {/* City */}
//                         <FormControl mt={4} isRequired isInvalid={errors.city}>
//                             <FormLabel>City</FormLabel>
//                             <Input
//                                 type='text'
//                                 name='city'
//                                 value={data.city}
//                                 onChange={(e) => setData('city', e.target.value)} />
//                             <FormErrorMessage>{errors.city}</FormErrorMessage>
//                         </FormControl>

//                         <Flex gap={4}>
//                             {/* Latitude */}
//                             <FormControl mt={4} isRequired isInvalid={errors.lat}>
//                                 <FormLabel>Latitude</FormLabel>
//                                 <Input
//                                     type='number'
//                                     name='lat'
//                                     value={data.lat}
//                                     onChange={(e) => setData('lat', e.target.value)} />
//                                 <FormErrorMessage>{errors.lat}</FormErrorMessage>
//                             </FormControl>

//                             {/* Address */}
//                             <FormControl mt={4} isRequired isInvalid={errors.lng}>
//                                 <FormLabel>Longitude</FormLabel>
//                                 <Input
//                                     type='number'
//                                     name='lng'
//                                     value={data.lng}
//                                     onChange={(e) => setData('lng', e.target.value)} />
//                                 <FormErrorMessage>{errors.lng}</FormErrorMessage>
//                             </FormControl>
//                         </Flex>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button type='submit' colorScheme='green' isLoading={processing} isDisabled={processing}>Create</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </form>
//         </Modal>
//     );
// }
