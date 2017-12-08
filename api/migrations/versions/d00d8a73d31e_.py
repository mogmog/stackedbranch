"""empty message

Revision ID: d00d8a73d31e
Revises: 3c1de29f174c
Create Date: 2017-12-08 11:58:04.306132

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd00d8a73d31e'
down_revision = '3c1de29f174c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('networks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(), nullable=True),
    sa.Column('network', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_foreign_key(None, 'ltesighting', 'sensors', ['sensor_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'ltesighting', type_='foreignkey')
    op.drop_table('networks')
    # ### end Alembic commands ###