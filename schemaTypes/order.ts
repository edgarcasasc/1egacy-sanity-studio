import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Órdenes de Compra',
  type: 'document',
  fields: [
    // --- ID DEL PAGO (STRIPE O PAYPAL) ---
    defineField({
      name: 'stripeCheckoutId',
      title: 'ID de Transacción (Stripe/PayPal)',
      type: 'string',
    }),
    
    // --- DATOS DEL CLIENTE ---
    defineField({
      name: 'customerName',
      title: 'Nombre del Cliente',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Teléfono / WhatsApp',
      type: 'string',
    }),

    // --- DETALLES DE LA VENTA ---
    defineField({
      name: 'amount',
      title: 'Monto Total',
      type: 'number',
    }),
    defineField({
      name: 'currency',
      title: 'Moneda',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Estado del Pago',
      type: 'string',
      options: {
        list: [
          { title: 'Pagado', value: 'paid' },
          { title: 'Pendiente', value: 'pending' },
          { title: 'Fallido', value: 'failed' }
        ]
      }
    }),
    defineField({
      name: 'orderDate',
      title: 'Fecha de Orden',
      type: 'datetime',
    }),

    // --- PRODUCTOS COMPRADOS ---
    defineField({
      name: 'items',
      title: 'Carrito de Compra',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productName', title: 'Producto', type: 'string' },
            { name: 'quantity', title: 'Cantidad', type: 'number' },
            { name: 'size', title: 'Talla', type: 'string' },
            { name: 'color', title: 'Color', type: 'string' },
            { name: 'serviceLevel', title: 'Nivel (Standard/Bespoke)', type: 'string' },
            { name: 'price', title: 'Precio Unitario', type: 'number' }
          ]
        }
      ]
    }),

    // --- DIRECCIÓN DE ENVÍO (IMPORTANTE PARA LOGÍSTICA) ---
    defineField({
      name: 'shippingAddress',
      title: 'Dirección de Envío',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Calle y Número', type: 'string' },
        { name: 'line2', title: 'Colonia / Int', type: 'string' },
        { name: 'city', title: 'Ciudad', type: 'string' },
        { name: 'state', title: 'Estado', type: 'string' },
        { name: 'postal_code', title: 'CP', type: 'string' },
        { name: 'country', title: 'País', type: 'string' }
      ]
    }),

    // --- CAMPOS DE AUTOMATIZACIÓN (N8N / BÓVEDA) ---
    defineField({
      name: 'accessToken',
      title: 'Token de Acceso (Bóveda)',
      type: 'string',
      readOnly: true, 
      description: 'Generado automáticamente por n8n. Es la llave para que el cliente entre a su Bóveda.'
    }),
    defineField({
      name: 'investigationStatus',
      title: 'Estatus de Investigación (Bespoke)',
      type: 'string',
      options: {
        list: [
          { title: '🟡 En Espera (Recibido)', value: 'pending' },
          { title: '🔵 En Proceso (Archivos)', value: 'processing' },
          { title: '🟢 Terminado (Listo)', value: 'completed' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    })
  ],
  
  // Configuración visual para la lista en el Studio
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'amount',
      date: 'orderDate'
    },
    prepare(selection) {
      const { title, subtitle, date } = selection
      return {
        title: title || 'Cliente Desconocido',
        subtitle: `$${subtitle} - ${date ? new Date(date).toLocaleDateString() : ''}`
      }
    }
  }
})