import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'order',
  title: 'Órdenes de Compra',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    // --- ENCABEZADO (Estado y Fecha) ---
    defineField({
      name: 'status',
      title: 'Estado del Pedido',
      type: 'string',
      options: {
        list: [
          { title: '✅ Pagado', value: 'paid' },
          { title: '⏳ Pendiente de Pago', value: 'pending' },
          { title: '📦 Enviado', value: 'shipped' },
          { title: '❌ Cancelado', value: 'cancelled' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'orderDate',
      title: 'Fecha de Orden',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true // Bloqueado: La fecha se pone automática al crear
    }),

    // --- DATOS AUTOMÁTICOS (SISTEMA) ---
    // Estos campos los llenan Stripe y n8n. Tú solo los ves.
    defineField({
      name: 'stripeCheckoutId',
      title: 'ID de Transacción (Stripe/PayPal)',
      type: 'string',
      readOnly: true, // ¡BLOQUEADO! No lo toques.
      description: 'Se genera automáticamente al recibir el pago.'
    }),
    defineField({
      name: 'accessToken',
      title: '🔑 Token de Bóveda',
      type: 'string',
      readOnly: true, // ¡BLOQUEADO!
      description: 'Llave generada por n8n para el cliente.'
    }),

    // --- CLIENTE ---
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

    // --- CARRITO ---
    defineField({
      name: 'items',
      title: 'Productos Comprados',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Producto',
          fields: [
            // REFERENCIA: Aquí buscas el producto en tu catálogo
            defineField({
              name: 'productRef',
              title: 'Seleccionar Producto',
              type: 'reference',
              to: [{ type: 'product' }]
            }),
            
            // SNAPSHOTS: Datos históricos
            // NOTA: En una orden REAL (Webhook), estos se llenan solos.
            // Si creas una orden MANUAL, tendrás que escribirlos tú.
            defineField({ 
              name: 'productName', 
              title: 'Nombre (Snapshot)', 
              type: 'string',
              description: 'Se llena automático por el Webhook. Si es manual, escríbelo.'
            }),
            defineField({ name: 'quantity', title: 'Cantidad', type: 'number', initialValue: 1 }),
            defineField({ name: 'size', title: 'Talla', type: 'string' }),
            defineField({ name: 'color', title: 'Color', type: 'string' }),
            defineField({ 
              name: 'serviceLevel', 
              title: 'Nivel', 
              type: 'string',
              options: { list: ['standard', 'bespoke'] }
            }),
            defineField({ name: 'price', title: 'Precio Unitario', type: 'number' })
          ],
          // Vista previa bonita en la lista
          preview: {
            select: {
              title: 'productName',
              refTitle: 'productRef.title',
              media: 'productRef.gallery.0'
            },
            prepare({ title, refTitle, media }) {
              return {
                title: title || refTitle || 'Producto',
                media: media
              }
            }
          }
        }
      ]
    }),

    // --- TOTALES ---
    defineField({
      name: 'amount',
      title: 'Monto Total (MXN)',
      type: 'number',
      readOnly: true, // ¡BLOQUEADO! Lo calcula el sistema.
      description: 'Calculado automáticamente por el sistema de pagos.'
    }),

    // --- ENVÍO ---
    defineField({
      name: 'shippingAddress',
      title: 'Dirección de Envío',
      type: 'object',
      fields: [
        { name: 'line1', title: 'Calle', type: 'string' },
        { name: 'city', title: 'Ciudad', type: 'string' },
        { name: 'state', title: 'Estado', type: 'string' },
        { name: 'postal_code', title: 'CP', type: 'string' },
        { name: 'country', title: 'País', type: 'string' }
      ]
    }),
// ... (después de shippingAddress) ...

    // --- VINCULACIÓN DE LINAJE (Este es el que te falta) ---
    defineField({
      name: 'linajeVinculado',
      title: '🛡️ Linaje Vinculado (Base de Datos)',
      description: 'IMPORTANTE: Selecciona aquí el apellido para que el cliente pueda ver su historia en el Códice.',
      type: 'reference',
      to: [{ type: 'linaje' }]
    }),

    // ... (antes de stripeCheckoutId) ...
    // --- ESTATUS INVESTIGACIÓN (BESPOKE) ---
    defineField({
      name: 'investigationStatus',
      title: '🕵️ Estatus de Investigación',
      type: 'string',
      options: {
        list: [
          { title: '🟡 En Espera', value: 'pending' },
          { title: '🔵 En Proceso', value: 'processing' },
          { title: '🟢 Terminado', value: 'completed' }
        ],
        layout: 'radio'
      },
      initialValue: 'pending'
    })
  ],

  // Vista de lista general
  preview: {
    select: {
      title: 'customerName',
      subtitle: 'amount',
      status: 'status',
      date: 'orderDate'
    },
    prepare({ title, subtitle, status, date }) {
      const emojis = { paid: '✅', pending: '⏳', shipped: '📦', cancelled: '❌' };
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: title || 'Nueva Orden',
        subtitle: `${emojis[status] || ''} $${subtitle || 0} — ${dateStr}`
      }
    }
  }
})